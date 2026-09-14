import { Panel } from "@/components/panel";
import { formatMoney } from "@/lib/format";
import type { ReportDaily } from "../types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
  });
}

export function ReportDailyTable({ rows }: { rows: ReportDaily[] }) {
  return (
    <Panel title="Rekap harian">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col />
            <col className="w-32" />
            <col className="w-40" />
          </colgroup>

          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="px-4 pb-2 font-medium">Tanggal</th>
              <th className="px-4 pb-2 text-right font-medium">Order</th>
              <th className="px-4 pb-2 text-right font-medium">Omzet</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(function renderRow(day) {
              return (
                <tr
                  key={day.date}
                  className="border-t border-border odd:bg-muted/30"
                >
                  <td className="px-4 py-2.5">{formatDate(day.date)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {day.orders}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {formatMoney(day.revenue)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}