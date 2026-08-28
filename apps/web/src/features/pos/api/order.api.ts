import { apiPost } from "@/lib/api";
import type { OrderType } from "@/types/shared";

export type CreateOrderPayload = {
  type: OrderType;
  idempotencyKey?: string;
  items: Array<{ menuId: string; qty: number; note?: string }>;
};

export type CreatedOrder = {
  id: string;
  number: string;
  status: string;
  total: number;
};

export function createOrder(payload: CreateOrderPayload) {
  return apiPost<CreatedOrder>("/orders", payload);
}