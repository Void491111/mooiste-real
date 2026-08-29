"use client";

import { STATION_LABEL } from "@/config/queue.config";
import { summarizeItems } from "../lib/queue";
import type { QueueItem } from "../types";
import { QueueItemRow } from "./queue-item-row";

type Props = {
  items: QueueItem[];
  checkable: boolean;
  onToggle: (itemId: string) => void;
};

export function QueueKitchenList({ items, checkable, onToggle }: Props) {
  if (items.length === 0) return null;

  if (!checkable) {
    return (
      <p className="truncate border-t border-border pt-2 text-xs text-muted-foreground">
        {STATION_LABEL.KITCHEN} · {summarizeItems(items)}
      </p>
    );
  }

  return (
    <div className="border-t border-border pt-2">
      <p className="mb-1 text-xs text-muted-foreground">
        {STATION_LABEL.KITCHEN} · sudah keluar?
      </p>

      {items.map(function renderKitchenItem(item) {
        return <QueueItemRow key={item.id} item={item} onToggle={onToggle} />;
      })}
    </div>
  );
}