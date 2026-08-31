import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DASHBOARD_CONFIG } from "./dashboard.config";
import { rangeOf } from "./dashboard.range";
import { fetchDaily, fetchPayments, fetchTotals } from "./dashboard.queries";
import { fetchHourly, fetchMenuRanks } from "./dashboard.queries.raw";
import type { DashboardSummary } from "./dashboard.types";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(days: number): Promise<DashboardSummary> {
    const current = rangeOf(days, 0);
    const previous = rangeOf(days, days);

    const [currentTotals, previousTotals, daily, hourly, ranks, payments] =
      await Promise.all([
        fetchTotals(this.prisma, current),
        fetchTotals(this.prisma, previous),
        fetchDaily(this.prisma, current),
        fetchHourly(this.prisma, current),
        fetchMenuRanks(this.prisma, current),
        fetchPayments(this.prisma, current),
      ]);

    const { menuRankLimit } = DASHBOARD_CONFIG;

    return {
      days,
      current: currentTotals,
      previous: previousTotals,
      daily,
      hourly,
      // ranks sudah urut dari terlaris. Kalau menunya sedikit,
      // dua daftar ini bisa beririsan — tidak apa-apa, jelas terlihat.
      topMenus: ranks.slice(0, menuRankLimit),
      slowMenus: [...ranks].reverse().slice(0, menuRankLimit),
      payments,
    };
  }
}