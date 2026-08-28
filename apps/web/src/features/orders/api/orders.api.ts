import { apiGet } from "@/lib/api";
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
  items: Array<{ id: string; name: string; qty: number; note: string; price: number }>;
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

export async function getOrders(filter: OrderFilter) {
  const query = filter === "ALL" ? "" : `?status=${filter}`;
  const orders = await apiGet<ServerOrder[]>(`/orders${query}`);
  return orders.map(toOrderRow);
}