import { BadRequestException, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";
import type { CreateOrderItemDto } from "./dto/create-order.dto";

type MenuWithCategory = Prisma.MenuGetPayload<{ include: { category: true } }>;

export function qtyByMenuOf(items: CreateOrderItemDto[]) {
  const qtyByMenu = new Map<string, number>();

  for (const item of items) {
    qtyByMenu.set(item.menuId, (qtyByMenu.get(item.menuId) ?? 0) + item.qty);
  }

  return qtyByMenu;
}

export async function loadAvailableMenus(
  tx: Prisma.TransactionClient,
  qtyByMenu: Map<string, number>,
) {
  const menus = await tx.menu.findMany({
    where: { id: { in: [...qtyByMenu.keys()] }, isActive: true },
    include: { category: true },
  });

  const menuById = new Map(
    menus.map(function toEntry(menu) {
      return [menu.id, menu] as const;
    }),
  );

  for (const [menuId, totalQty] of qtyByMenu) {
    const menu = menuById.get(menuId);

    if (!menu) {
      throw new NotFoundException(`Menu tidak ditemukan: ${menuId}`);
    }

    const available = menu.stock - menu.reservedQty;

    if (totalQty > available) {
      throw new BadRequestException(`Stok ${menu.name} tinggal ${available}`);
    }
  }

  return menuById;
}

export function toOrderLines(
  items: CreateOrderItemDto[],
  menuById: Map<string, MenuWithCategory>,
) {
  return items.map(function toLine(item) {
    const menu = menuById.get(item.menuId)!;

    return {
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
      qty: item.qty,
      note: item.note ?? "",
      station: menu.category.station,
    };
  });
}

export function totalsOf(lines: { price: number; qty: number }[]) {
  const subtotal = lines.reduce(function sumLine(total, line) {
    return total + line.price * line.qty;
  }, 0);

  const tax = Math.round(subtotal * POS_CONFIG.tax.rate);

  return { subtotal, tax, total: subtotal + tax };
}