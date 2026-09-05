import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { OrderSource, OrderStatus } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";
import { PrismaService } from "../prisma/prisma.service";
import {
  loadAvailableMenus,
  qtyByMenuOf,
  toOrderLines,
  totalsOf,
} from "./order.build";
import { assertCancellable, assertDayIsOpen } from "./order.guard";
import {
  businessDateFrom,
  nextOrderNumber,
  startOfBusinessDay,
} from "./order.number";
import { restoreStock, takeStock } from "./order.stock";
import { CancelOrderDto } from "./dto/cancel-order-dto";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto, cashierId: string | null) {
    const source = dto.source ?? OrderSource.CASHIER;
    const isPaidOnCreate = source === OrderSource.CASHIER;

    if (isPaidOnCreate && !dto.paymentMethod) {
      throw new BadRequestException("Cara bayar wajib diisi");
    }

    const existing = await this.findByKey(dto.idempotencyKey);

    if (existing) return existing;

    const now = new Date();
    const businessDate = startOfBusinessDay(now);

    await assertDayIsOpen(this.prisma, businessDate);

    return this.prisma.$transaction(async function runCreateOrder(tx) {
      const qtyByMenu = qtyByMenuOf(dto.items);
      const menuById = await loadAvailableMenus(tx, qtyByMenu);
      const lines = toOrderLines(dto.items, menuById);

      await takeStock(tx, qtyByMenu, isPaidOnCreate);

      return tx.order.create({
        data: {
          number: await nextOrderNumber(tx, businessDate),
          businessDate,
          type: dto.type,
          source,
          status: isPaidOnCreate
            ? OrderStatus.PAID
            : OrderStatus.PENDING_PAYMENT,
          paidAt: isPaidOnCreate ? now : null,
          ...totalsOf(lines),
          idempotencyKey: dto.idempotencyKey ?? null,
          paymentMethod: dto.paymentMethod ?? null,
          cashierId,
          items: { create: lines },
        },
        include: { items: true },
      });
    });
  }

  async cancel(
    orderId: string,
    dto: CancelOrderDto,
    cancelledById: string | null,
  ) {
    if (!cancelledById) {
      throw new UnauthorizedException("Sesi tidak dikenali");
    }

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException("Pesanan tidak ditemukan");
    }

    assertCancellable(order.status);
    await assertDayIsOpen(this.prisma, order.businessDate);

    const stockWasTaken = order.source === OrderSource.CASHIER;

    return this.prisma.$transaction(async function runCancel(tx) {
      await restoreStock(tx, order.items, stockWasTaken);

      return tx.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CANCELLED,
          cancelReason: dto.reason.trim(),
          cancelledAt: new Date(),
          cancelledById,
        },
        include: { items: true },
      });
    });
  }

  findQueue() {
    return this.prisma.order.findMany({
      where: {
        businessDate: startOfBusinessDay(new Date()),
        status: { in: [OrderStatus.PAID, OrderStatus.IN_PROGRESS] },
      },
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

  findByDate(date: string | undefined, status?: OrderStatus) {
    return this.prisma.order.findMany({
      where: {
        businessDate: date
          ? businessDateFrom(date)
          : startOfBusinessDay(new Date()),
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

  private findByKey(key: string | undefined) {
    if (!key) return null;

    return this.prisma.order.findUnique({
      where: { idempotencyKey: key },
      include: { items: true },
    });
  }
}