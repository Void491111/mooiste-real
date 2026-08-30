import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

type MenuWithCategory = Prisma.MenuGetPayload<{ include: { category: true } }>;

function toManageRow(menu: MenuWithCategory) {
  return {
    id: menu.id,
    name: menu.name,
    price: menu.price,
    stock: menu.stock,
    reservedQty: menu.reservedQty,
    available: Math.max(menu.stock - menu.reservedQty, 0),
    isActive: menu.isActive,
    category: menu.category.label,
  };
}

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const menus = await this.prisma.menu.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    });

    return menus.map(function toMenuResponse(menu) {
      return {
        id: menu.id,
        name: menu.name,
        price: menu.price,
        image: menu.image,
        category: menu.category.code,
        stock: Math.max(menu.stock - menu.reservedQty, 0),
      };
    });
  }

  async findForManage() {
    const menus = await this.prisma.menu.findMany({
      include: { category: true },
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    });

    return menus.map(toManageRow);
  }

  async setStock(id: string, stock: number) {
    await this.ensureExists(id);

    const menu = await this.prisma.menu.update({
      where: { id },
      data: { stock },
      include: { category: true },
    });

    return toManageRow(menu);
  }

  markSoldOut(id: string) {
    return this.setStock(id, 0);
  }

  private async ensureExists(id: string) {
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new NotFoundException("Menu tidak ditemukan");
    }
  }
}