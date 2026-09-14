import { Panel } from "@/components/panel";
import { formatMoney } from "@/lib/format";
import type { ReportTotals } from "../types";

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <Panel>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-[22px] font-medium tracking-tight text-foreground">
        {value}
      </p>
    </Panel>
  );
}

export function ReportSummary({ totals }: { totals: ReportTotals }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Figure label="Omzet" value={formatMoney(totals.revenue)} />
      <Figure
        label="Jumlah order"
        value={totals.orders.toLocaleString("id-ID")}
      />
      <Figure
        label="Rata-rata per struk"
        value={formatMoney(totals.averageTicket)}
      />
      <Figure
        label="Pembatalan"
        value={totals.cancelled.toLocaleString("id-ID")}
      />
    </div>
  );
}