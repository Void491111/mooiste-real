import { formatMoney } from "@/lib/format";
import { growthOf } from "../lib/dashboard";

type StatCardProps = {
  label: string;
  value: number;
  previous: number;
  kind: "money" | "count";
};

function DeltaLine({ growth }: { growth: number | null }) {
  if (growth === null) {
    return <p className="mt-1.5 text-xs text-note">—</p>;
  }

  const isUp = growth >= 0;

  return (
    <p
      className={`mt-1.5 text-xs tabular-nums ${
        isUp ? "text-stock-ok" : "text-danger-soft"
      }`}
    >
      <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>{" "}
      {Math.abs(growth).toFixed(1)}%
    </p>
  );
}

export function StatCard({ label, value, previous, kind }: StatCardProps) {
  return (
    <div className="rounded-card border border-border bg-card p-5">
      <p className="text-xs text-note">{label}</p>
        <p className="mt-2 text-[22px] font-medium tracking-tight text-foreground">
        {kind === "money" ? formatMoney(value) : value.toLocaleString("id-ID")}
      </p>
      <DeltaLine growth={growthOf(value, previous)} />
    </div>
  );
}