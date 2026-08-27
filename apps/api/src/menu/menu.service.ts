import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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
}
