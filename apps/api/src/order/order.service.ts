import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderSource, OrderStatus } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { nextOrderNumber, startOfBusinessDay } from "./order.number";


@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const source = dto.source ?? OrderSource.CASHIER;
    const isPaidOnCreate = source === OrderSource.CASHIER;

    if (dto.idempotencyKey) {
      const existing = await this.prisma.order.findUnique({
        where: { idempotencyKey: dto.idempotencyKey },
        include: { items: true },
      });

      if (existing) return existing;
    }

    return this.prisma.$transaction(async function runCreateOrder(tx) {
      const qtyByMenu = new Map<string, number>();

      for (const item of dto.items) {
        qtyByMenu.set(item.menuId, (qtyByMenu.get(item.menuId) ?? 0) + item.qty);
      }

      const menus = await tx.menu.findMany({
        where: { id: { in: [...qtyByMenu.keys()] }, isActive: true },
        include: { category: true },
      });

      const menuById = new Map(menus.map((menu) => [menu.id, menu]));

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

      const items = dto.items.map(function toOrderItem(item) {
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

      const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
      const tax = Math.round(subtotal * POS_CONFIG.tax.rate);

      for (const [menuId, totalQty] of qtyByMenu) {
        await tx.menu.update({
          where: { id: menuId },
          data: isPaidOnCreate
            ? { stock: { decrement: totalQty } }
            : { reservedQty: { increment: totalQty } },
        });
      }

            const now = new Date();
      const businessDate = startOfBusinessDay(now);

      return tx.order.create({
        data: {
          number: await nextOrderNumber(tx, businessDate),
          businessDate,
          type: dto.type,
          source,
          status: isPaidOnCreate ? OrderStatus.PAID : OrderStatus.PENDING_PAYMENT,
          paidAt: isPaidOnCreate ? now : null,
          subtotal,
          tax,
          total: subtotal + tax,
          idempotencyKey: dto.idempotencyKey ?? null,
          items: { create: items },
        },
        include: { items: true },
      });
    });
  }

  findQueue() {
    return this.prisma.order.findMany({
      where: { status: { in: [OrderStatus.PAID, OrderStatus.IN_PROGRESS] } },
      include: { items: true },
      orderBy: { createdAt: "asc" },
    });
  }

  findRecent() {
    return this.prisma.order.findMany({
      where: { status: OrderStatus.DONE },
      include: { items: true },
      orderBy: { updatedAt: "desc" },
      take: POS_CONFIG.queue.recentLimit,
    });
  }

      findToday(status?: OrderStatus) {
    return this.prisma.order.findMany({
      where: {
        businessDate: startOfBusinessDay(new Date()),
        ...(status ? { status } : {}),
      },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async toggleItem(orderId: string, itemId: string) {
    const item = await this.prisma.orderItem.findFirst({
      where: { id: itemId, orderId },
    });

    if (!item) {
      throw new NotFoundException("Item pesanan tidak ditemukan");
    }

    await this.prisma.orderItem.update({
      where: { id: itemId },
      data: { isDone: !item.isDone },
    });

    return this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { items: true },
    });
  }

  setStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    });
  }
}