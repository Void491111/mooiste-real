import { QUEUE_CONFIG } from "@/config/queue.config";
import type { QueueItem, QueueOrder, Station, Urgency } from "../types";

export function elapsedMinutes(createdAt: string, now: number) {
  return Math.max(Math.floor((now - new Date(createdAt).getTime()) / 60_000), 0);
}

export function urgencyOf(minutes: number): Urgency {
  if (minutes >= QUEUE_CONFIG.urgency.lateMinutes) return "late";
  if (minutes >= QUEUE_CONFIG.urgency.warnMinutes) return "warn";
  return "normal";
}

export function itemsOf(order: QueueOrder, station: Station) {
  return order.items.filter((item) => item.station === station);
}

export function doneCount(items: QueueItem[]) {
  return items.reduce((total, item) => (item.isDone ? total + 1 : total), 0);
}

export function isStationDone(order: QueueOrder, station: Station) {
  const items = itemsOf(order, station);
  return items.length > 0 && items.every((item) => item.isDone);
}

export function summarizeItems(items: QueueItem[]) {
  return items
    .map(function toLabel(item) {
      return `${item.qty} ${item.name}`;
    })
    .join(", ");
}