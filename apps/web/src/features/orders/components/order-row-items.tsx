import { formatMoney } from "@/lib/format";
import type { OrderItemRow } from "../types";

export function OrderRowItems({ items }: { items: OrderItemRow[] }) {
  return (
    <tr className="border-b border-border/60 bg-muted/20">
      <td colSpan={5} className="px-4 pb-3 pt-0">
        <ul className="ml-5 space-y-1">
          {items.map(function renderItem(item) {
            return (
              <li
                key={item.id}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="text-foreground">
                  <span className="tabular-nums text-muted-foreground">
                    {item.qty}×
                  </span>{" "}
                  {item.name}
                  {item.note ? (
                    <span className="ml-2 text-xs italic text-muted-foreground">
                      {item.note}
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {formatMoney(item.price * item.qty)}
                </span>
              </li>
            );
          })}
        </ul>
      </td>
    </tr>
  );
}