import { apiGet, apiPatch } from "@/lib/api";
import type { OrderType } from "@/types/shared";
import type { OrderFilter, OrderRow, OrderSource, OrderStatus } from "../types";

type ServerOrder = {
  id: string;
  number: string;
  status: OrderStatus;
  source: OrderSource;
  type: OrderType;
  createdAt: string;
  total: number;
  cancelReason: string | null;
  items: Array<{
    id: string;
    name: string;
    qty: number;
    note: string;
    price: number;
  }>;
};

function toOrderRow(order: ServerOrder): OrderRow {
  return {
    id: order.id,
    number: order.number,
    status: order.status,
    source: order.source,
    orderType: order.type,
    createdAt: order.createdAt,
    total: order.total,
    cancelReason: order.cancelReason,
    items: order.items.map(function toItemRow(item) {
      return {
        id: item.id,
        name: item.name,
        qty: item.qty,
        note: item.note,
        price: item.price,
      };
    }),
  };
}

export async function getOrders(filter: OrderFilter, date: string) {
  const params = new URLSearchParams({ date });

  if (filter !== "ALL") params.set("status", filter);

  const data = await apiGet<ServerOrder[]>(`/orders?${params.toString()}`);

  return data.map(toOrderRow);
}

export async function cancelOrder(orderId: string, reason: string) {
  const data = await apiPatch<ServerOrder>(`/orders/${orderId}/cancel`, {
    reason,
  });

  return toOrderRow(data);
}