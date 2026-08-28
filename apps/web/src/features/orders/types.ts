import type { ORDER_FILTERS, ORDER_SOURCE_META, ORDER_STATUS_META } from "@/config/orders.config";
import type { OrderType } from "@/types/shared";

export type OrderStatus = keyof typeof ORDER_STATUS_META;
export type OrderSource = keyof typeof ORDER_SOURCE_META;
export type OrderFilter = (typeof ORDER_FILTERS)[number]["value"];

export type OrderItemRow = {
  id: string;
  name: string;
  qty: number;
  note: string;
  price: number;
};

export type OrderRow = {
  id: string;
  number: string;
  status: OrderStatus;
  source: OrderSource;
  orderType: OrderType;
  createdAt: string;
  total: number;
  items: OrderItemRow[];
};