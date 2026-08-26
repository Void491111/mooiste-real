import { QUEUE_CONFIG } from "@/config/queue.config";
import type { QueueItem, QueueOrder, QueueOrderTemplate, Station, Urgency } from "../types";

export function seedOrders(templates: QueueOrderTemplate[], now: number): QueueOrder[] {
  return templates.map(function toOrder(template) {
    const { minutesAgo, ...rest } = template;
    return { ...rest, createdAt: new Date(now - minutesAgo * 60_000).toISOString() };
  });
}

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

export function toggleItem(orders: QueueOrder[], orderId: string, itemId: string): QueueOrder[] {
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

export function markStationDone(orders: QueueOrder[], orderId: string, station: Station): QueueOrder[] {
  return orders.map(function updateOrder(order) {
    if (order.id !== orderId) return order;

    return {
      ...order,
      items: order.items.map(function finishItem(item) {
        if (item.station !== station) return item;
        return { ...item, isDone: true };
      }),
    };
  });
}

export function removeOrder(orders: QueueOrder[], orderId: string): QueueOrder[] {
  return orders.filter((order) => order.id !== orderId);
}

export function sortByOldest(orders: QueueOrder[]): QueueOrder[] {
  return [...orders].sort(function byCreatedAt(a, b) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export function summarizeItems(items: QueueItem[]) {
  return items.map(function toLabel(item) {
    return `${item.qty} ${item.name}`;
  }).join(", ");
}