import type { DashboardSummary } from "../types";
import { StatCard } from "./stat-card";

export function StatRow({ summary }: { summary: DashboardSummary }) {
  const { current, previous } = summary;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
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
    </div>
  );
}