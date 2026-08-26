import { STATION_LABEL } from "@/config/queue.config";
import { summarizeItems } from "../lib/queue";
import type { QueueItem } from "../types";

type Props = {
  items: QueueItem[];
};

export function QueueKitchenList({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <p className="truncate border-t border-border pt-2 text-xs text-muted-foreground">
      {STATION_LABEL.KITCHEN} · {summarizeItems(items)}
    </p>
  );
}