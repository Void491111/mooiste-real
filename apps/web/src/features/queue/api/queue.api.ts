import { apiGet, apiPatch } from "@/lib/api";
import type { OrderType } from "@/types/shared";
import type { QueueOrder, Station } from "../types";

type ServerOrderItem = {
  id: string;
  name: string;
  qty: number;
  note: string;
  station: Station;
  isDone: boolean;
};

type ServerOrder = {
  id: string;
  number: string;
  type: OrderType;
  createdAt: string;
  items: ServerOrderItem[];
};

function toQueueOrder(order: ServerOrder): QueueOrder {
  return {
    id: order.id,
    number: order.number,
    orderType: order.type,
    createdAt: order.createdAt,
    items: order.items.map(function toQueueItem(item) {
      return {
        id: item.id,
        name: item.name,
        qty: item.qty,
        note: item.note,
        station: item.station,
        isDone: item.isDone,
      };
    }),
  };
}

export async function getQueue() {
  const orders = await apiGet<ServerOrder[]>("/orders/queue");
  return orders.map(toQueueOrder);
}

export async function getRecent() {
  const orders = await apiGet<ServerOrder[]>("/orders/recent");
  return orders.map(toQueueOrder);
}

export async function toggleQueueItem(orderId: string, itemId: string) {
  const order = await apiPatch<ServerOrder>(`/orders/${orderId}/items/${itemId}/toggle`);
  return toQueueOrder(order);
}

export async function setOrderStatus(orderId: string, status: "DONE" | "PAID") {
  const order = await apiPatch<ServerOrder>(`/orders/${orderId}/status`, { status });
  return toQueueOrder(order);
}