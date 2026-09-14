import { BadRequestException, Injectable } from "@nestjs/common";
import { fetchDaily, fetchPayments, fetchTotals } from "../dashboard/dashboard.queries";
import { fetchMenuRanks } from "../dashboard/dashboard.queries.raw";
import type { DateRange } from "../dashboard/dashboard.range";
import { businessDateFrom } from "../order/order.number";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async getReport(from: string | undefined, to: string | undefined) {
    const range = rangeFrom(from, to);

    const [totals, daily, menus, payments] = await Promise.all([
      fetchTotals(this.prisma, range),
      fetchDaily(this.prisma, range),
      fetchMenuRanks(this.prisma, range),
      fetchPayments(this.prisma, range),
    ]);

    return { from, to, totals, daily, menus, payments };
  }
}

function rangeFrom(from: string | undefined, to: string | undefined): DateRange {
  if (!from || !to) {
    throw new BadRequestException("Tanggal mulai dan akhir wajib diisi");
  }

  const start = businessDateFrom(from);
  const end = businessDateFrom(to);

  if (start > end) {
    throw new BadRequestException(
      "Tanggal mulai tidak boleh setelah tanggal akhir",
    );
  }

  return { from: start, to: end };
}