import { PrismaService } from "../prisma/prisma.service";
import { DASHBOARD_CONFIG } from "./dashboard.config";
import type { DateRange } from "./dashboard.range";
import type { DailyPoint, PaymentSplit, PeriodTotals } from "./dashboard.types";
import { OrderStatus } from "@prisma/client";

const REVENUE_STATUSES = [...DASHBOARD_CONFIG.revenueStatuses];

function whereInRange(range: DateRange) {
  return {
    businessDate: { gte: range.from, lte: range.to },
    status: { in: REVENUE_STATUSES },
  };
}

export async function fetchTotals(
  prisma: PrismaService,
  range: DateRange,
): Promise<PeriodTotals> {
  const [paid, cancelled] = await Promise.all([
    prisma.order.aggregate({
      where: whereInRange(range),
      _sum: { total: true },
      _count: { _all: true },
    }),
    prisma.order.count({
      where: {
        businessDate: { gte: range.from, lte: range.to },
        status: OrderStatus.CANCELLED,
      },
    }),
  ]);

  const revenue = paid._sum.total ?? 0;
  const orders = paid._count._all;

  return {
    revenue,
    orders,
    averageTicket: orders > 0 ? Math.round(revenue / orders) : 0,
    cancelled,
  };
}

export async function fetchDaily(
  prisma: PrismaService,
  range: DateRange,
): Promise<DailyPoint[]> {
  const rows = await prisma.order.groupBy({
    by: ["businessDate"],
    where: whereInRange(range),
    _sum: { total: true },
    _count: { _all: true },
    orderBy: { businessDate: "asc" },
  });

  return rows.map(function toPoint(row) {
    return {
      date: row.businessDate.toISOString().slice(0, 10),
      revenue: row._sum.total ?? 0,
      orders: row._count._all,
    };
  });
}

export async function fetchPayments(
  prisma: PrismaService,
  range: DateRange,
): Promise<PaymentSplit[]> {
  const rows = await prisma.order.groupBy({
    by: ["paymentMethod"],
    where: { ...whereInRange(range), paymentMethod: { not: null } },
    _sum: { total: true },
    _count: { _all: true },
  });

  return rows.map(function toSplit(row) {
    return {
      method: row.paymentMethod ?? "UNKNOWN",
      total: row._sum.total ?? 0,
      orders: row._count._all,
    };
  });
}