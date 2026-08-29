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
  return itemsOf(order, station).every((item) => item.isDone);
}

export function summarizeItems(items: QueueItem[]) {
  return items
    .map(function toLabel(item) {
      return `${item.qty} ${item.name}`;
    })
    .join(", ");
}

export function needsKitchenConfirm(orderType: string) {
  return (QUEUE_CONFIG.requireKitchenConfirm as readonly string[]).includes(orderType);
}

export function canHandOver(order: QueueOrder) {
  const barReady = isStationDone(order, "BAR");

  if (!needsKitchenConfirm(order.orderType)) return barReady;

  return barReady && isStationDone(order, "KITCHEN");
}

export function toggleItemIn(orders: QueueOrder[], orderId: string, itemId: string): QueueOrder[] {
  return orders.map(function updateOrder(order) {
    if (order.id !== orderId) return order;

    return {
      ...order,
      items: order.items.map(function updateItem(item) {
        if (item.id !== itemId) return item;
        return { ...item, isDone: !item.isDone };
      }),
    };
  });
}