import { STATION_LABEL } from "@/config/queue.config";
import type { QueueItem } from "../types";

type Props = {
  items: QueueItem[];
};

export function QueueKitchenList({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-card border border-dashed border-border p-2.5">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {STATION_LABEL.KITCHEN}
      </p>

      <ul className="space-y-0.5">
        {items.map(function renderKitchenItem(item) {
          return (
            <li key={item.id} className="flex gap-2 text-sm text-muted-foreground">
              <span className="tabular-nums">{item.qty}×</span>
              <span className="truncate">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}