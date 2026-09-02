import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PaymentMethod } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";
import { businessDateFrom, startOfBusinessDay } from "../order/order.number";
import { PrismaService } from "../prisma/prisma.service";
import { CreateClosingDto } from "./closing.dto";

@Injectable()
export class ClosingService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(date: string | undefined) {
    const businessDate = date
      ? businessDateFrom(date)
      : startOfBusinessDay(new Date());

    const statuses = [...POS_CONFIG.order.revenueStatuses];

    const [all, cash, closing] = await Promise.all([
      this.prisma.order.aggregate({
        where: { businessDate, status: { in: statuses } },
        _sum: { total: true },
        _count: { _all: true },
      }),
      this.prisma.order.aggregate({
        where: {
          businessDate,
          status: { in: statuses },
          paymentMethod: PaymentMethod.CASH,
        },
        _sum: { total: true },
      }),
      this.prisma.cashClosing.findUnique({
        where: { businessDate },
        include: { closedBy: { select: { name: true } } },
      }),
    ]);

    return {
      businessDate: businessDate.toISOString().slice(0, 10),
      totalRevenue: all._sum.total ?? 0,
      orderCount: all._count._all,
      expectedCash: cash._sum.total ?? 0,
      closing: closing
        ? {
            expectedCash: closing.expectedCash,
            countedCash: closing.countedCash,
            difference: closing.difference,
            note: closing.note,
            closedBy: closing.closedBy.name,
            closedAt: closing.createdAt,
          }
        : null,
    };
  }

  async close(dto: CreateClosingDto, closedById: string | null) {
    if (!closedById) {
      throw new UnauthorizedException("Sesi tidak dikenali");
    }

    const summary = await this.getSummary(dto.date);

    // Sekali sehari. Kalau sudah ditutup lalu ada koreksi, itu perlu
    // pembatalan yang tercatat — bukan diam-diam ditimpa.
    if (summary.closing) {
      throw new ConflictException("Kas tanggal ini sudah ditutup");
    }

    const businessDate = dto.date
      ? businessDateFrom(dto.date)
      : startOfBusinessDay(new Date());

    await this.prisma.cashClosing.create({
      data: {
        businessDate,
        expectedCash: summary.expectedCash,
        countedCash: dto.countedCash,
        difference: dto.countedCash - summary.expectedCash,
        totalRevenue: summary.totalRevenue,
        orderCount: summary.orderCount,
        note: dto.note ?? "",
        closedById,
      },
    });

    return this.getSummary(dto.date);
  }
}