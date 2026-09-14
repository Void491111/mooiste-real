import { Panel } from "@/components/panel";
import { formatMoney } from "@/lib/format";
import type { ReportMenu } from "../types";

export function ReportMenuTable({ rows }: { rows: ReportMenu[] }) {
  return (
    <Panel title="Penjualan per menu">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col />
            <col className="w-36" />
            <col className="w-28" />
            <col className="w-40" />
          </colgroup>

          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="px-4 pb-2 font-medium">Menu</th>
              <th className="px-4 pb-2 font-medium">Kategori</th>
              <th className="px-4 pb-2 text-right font-medium">Terjual</th>
              <th className="px-4 pb-2 text-right font-medium">Omzet</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(function renderRow(menu) {
              return (
                <tr
                  key={menu.menuId}
                  className="border-t border-border odd:bg-muted/30"
                >
                  <td className="truncate px-4 py-2.5">{menu.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {menu.category}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {menu.qty}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {formatMoney(menu.revenue)}
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