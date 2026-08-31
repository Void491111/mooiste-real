import {
  bestDay,
  busiestHour,
  formatDayLabel,
  formatHourLabel,
} from "../lib/dashboard";
import type { DashboardSummary } from "../types";
import { HourlyChart } from "./hourly-chart";
import { MenuTable } from "./menu-table";
import { Panel } from "./panel";
import { PaymentMeter } from "./payment-meter";
import { RevenueChart } from "./revenue-chart";
import { StatRow } from "./stat-row";

export function DashboardBody({ summary }: { summary: DashboardSummary }) {
  const peak = busiestHour(summary.hourly);
  const best = bestDay(summary.daily);

  return (
    <div className="space-y-5">
      <StatRow summary={summary} />

      <Panel
        title="Omzet harian"
        hint={best ? `Tertinggi ${formatDayLabel(best.date)}` : undefined}
      >
        <RevenueChart daily={summary.daily} />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          title="Sebaran jam"
          hint={peak ? `Paling ramai ${formatHourLabel(peak.hour)}` : undefined}
        >
          <HourlyChart hourly={summary.hourly} />
        </Panel>

        <Panel title="Cara bayar" hint={`${summary.days} hari terakhir`}>
          <PaymentMeter payments={summary.payments} />
        </Panel>
      </div>

      <Panel title="Menu" hint="Diurut dari yang paling banyak terjual">
        <MenuTable menus={summary.menus} />
      </Panel>
    </div>
  );
}