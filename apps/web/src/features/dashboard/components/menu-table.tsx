import { formatMoney } from "@/lib/format";
import type { MenuRank } from "../types";

export function MenuTable({ menus }: { menus: MenuRank[] }) {
  const max = menus.reduce(function keepMax(best, item) {
    return Math.max(best, item.qty);
  }, 0);

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-xs text-note">
          <th className="pb-2 text-left font-normal">Menu</th>
          <th className="pb-2 pl-6 text-right font-normal">Porsi</th>
          <th className="pb-2 pl-6 text-right font-normal">Omzet</th>
        </tr>
      </thead>
      <tbody>
        {menus.map(function toRow(item) {
          return (
            <tr key={item.menuId} className="border-t border-border">
              <td className="w-full py-2.5 pr-6">
                <span className="text-foreground">{item.name}</span>
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-1 rounded-full bg-brand"
                  style={{ width: `${max > 0 ? (item.qty / max) * 100 : 0}%` }}
                />
              </td>
              <td className="py-2.5 pl-6 text-right tabular-nums text-foreground">
                {item.qty}
              </td>
              <td className="py-2.5 pl-6 text-right tabular-nums text-note">
                {formatMoney(item.revenue)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}