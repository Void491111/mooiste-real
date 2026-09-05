import {
  bestDay,
  busiestHour,
  formatDayLabel,
  formatHourLabel,
  groupByCategory,
  rangeLabel,
} from "../lib/dashboard";
import type { DashboardSummary } from "../types";
import { CategoryDonut } from "./category-donut";
import { HourlyChart } from "./hourly-chart";
import { MenuTable } from "./menu-table";
import { PaymentMeter } from "./payment-meter";
import { RevenueChart } from "./revenue-chart";
import { StatRow } from "./stat-row";
import { Panel } from "@/components/panel";

export function DashboardBody({ summary }: { summary: DashboardSummary }) {
  const peak = busiestHour(summary.hourly);
  const best = bestDay(summary.daily);
  const slices = groupByCategory(summary.menus);
  const isSingleDay = summary.days === 1;

  return (
    <div className="space-y-5">
      <StatRow summary={summary} />

      {isSingleDay ? null : (
        <Panel
          title="Omzet harian"
          hint={best ? `Tertinggi ${formatDayLabel(best.date)}` : undefined}
        >
          <RevenueChart daily={summary.daily} />
        </Panel>
      )}

      <Panel
        title="Sebaran jam"
        hint={peak ? `Paling ramai ${formatHourLabel(peak.hour)}` : undefined}
      >
        <HourlyChart hourly={summary.hourly} />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Omzet per kategori" hint={rangeLabel(summary.days)}>
          <CategoryDonut slices={slices} />
        </Panel>

        <Panel title="Cara bayar" hint={rangeLabel(summary.days)}>
          <PaymentMeter payments={summary.payments} />
        </Panel>
      </div>

      <Panel title="Menu" hint="Warna batang mengikuti kategori">
        <MenuTable menus={summary.menus} />
      </Panel>
    </div>
  );
}