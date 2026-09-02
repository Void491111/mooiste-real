import { formatMoney } from "@/lib/format";
import type { ClosingSummary } from "../types";

type StatProps = {
  label: string;
  value: string;
  isPrimary?: boolean;
};

function Stat({ label, value, isPrimary }: StatProps) {
  return (
    <div className="rounded-card border border-border bg-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={
          isPrimary
            ? "mt-2 text-2xl font-semibold tracking-tight text-foreground"
            : "mt-2 text-[22px] font-medium tracking-tight text-foreground"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function ClosingStats({ summary }: { summary: ClosingSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Stat label="Total penjualan" value={formatMoney(summary.totalRevenue)} />
      <Stat label="Jumlah pesanan" value={String(summary.orderCount)} />
      <Stat
        label="Tunai seharusnya ada"
        value={formatMoney(summary.expectedCash)}
        isPrimary
      />
    </div>
  );
}