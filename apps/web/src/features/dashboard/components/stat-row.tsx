import type { DashboardSummary } from "../types";
import { StatCard } from "./stat-card";

export function StatRow({ summary }: { summary: DashboardSummary }) {
  const { current, previous } = summary;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Omzet"
        kind="money"
        value={current.revenue}
        previous={previous.revenue}
      />
      <StatCard
        label="Jumlah order"
        kind="count"
        value={current.orders}
        previous={previous.orders}
      />
      <StatCard
        label="Rata-rata per struk"
        kind="money"
        value={current.averageTicket}
        previous={previous.averageTicket}
      />
      <StatCard
        label="Pembatalan"
        kind="count"
        value={current.cancelled}
        previous={previous.cancelled}
        isLowerBetter
      />
    </div>
  );
}