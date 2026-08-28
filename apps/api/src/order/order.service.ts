import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderSource, OrderStatus } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { nextOrderNumber } from "./order.number";

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
      const menus = await tx.menu.findMany({
        where: { id: { in: dto.items.map((item) => item.menuId) }, isActive: true },
        include: { category: true },
      });

      const menuById = new Map(menus.map((menu) => [menu.id, menu]));

      const items = dto.items.map(function toOrderItem(item) {
        const menu = menuById.get(item.menuId);

        if (!menu) {
          throw new NotFoundException(`Menu tidak ditemukan: ${item.menuId}`);
        }

        const available = menu.stock - menu.reservedQty;

        if (item.qty > available) {
          throw new BadRequestException(`Stok ${menu.name} tinggal ${available}`);
        }

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

      for (const item of items) {
        await tx.menu.update({
          where: { id: item.menuId },
          data: isPaidOnCreate
            ? { stock: { decrement: item.qty } }
            : { reservedQty: { increment: item.qty } },
        });
      }

      const now = new Date();

      return tx.order.create({
        data: {
          number: await nextOrderNumber(tx, now),
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
}