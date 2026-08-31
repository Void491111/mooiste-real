import { PrismaService } from "../prisma/prisma.service";
import { DASHBOARD_CONFIG } from "./dashboard.config";
import type { DateRange } from "./dashboard.range";
import type { DailyPoint, PaymentSplit, PeriodTotals } from "./dashboard.types";

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
  const result = await prisma.order.aggregate({
    where: whereInRange(range),
    _sum: { total: true },
    _count: { _all: true },
  });

  const revenue = result._sum.total ?? 0;
  const orders = result._count._all;

  return {
    revenue,
    orders,
    averageTicket: orders > 0 ? Math.round(revenue / orders) : 0,
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