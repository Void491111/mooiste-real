import { Panel } from "@/components/panel";
import { formatMoney } from "@/lib/format";
import { growthOf } from "../lib/dashboard";

type StatCardProps = {
  label: string;
  value: number;
  previous: number;
  kind: "money" | "count";
  isLowerBetter?: boolean;
};

function DeltaLine({
  growth,
  isLowerBetter,
}: {
  growth: number | null;
  isLowerBetter?: boolean;
}) {
  if (growth === null) {
    return <p className="mt-1.5 text-xs text-muted-foreground">—</p>;
  }

  const isUp = growth >= 0;
  const isGood = isLowerBetter ? !isUp : isUp;

  return (
    <p
      className={`mt-1.5 text-xs tabular-nums ${
        isGood ? "text-stock-ok" : "text-danger-soft"
      }`}
    >
      <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>{" "}
      {Math.abs(growth).toFixed(1)}%
    </p>
  );
}

export function StatCard({
  label,
  value,
  previous,
  kind,
  isLowerBetter,
}: StatCardProps) {
  return (
    <Panel>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-[22px] font-medium tracking-tight text-foreground">
        {kind === "money" ? formatMoney(value) : value.toLocaleString("id-ID")}
      </p>
      <DeltaLine
        growth={growthOf(value, previous)}
        isLowerBetter={isLowerBetter}
      />
    </Panel>
  );
}