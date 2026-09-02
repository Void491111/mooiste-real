import { apiPost } from "@/lib/api";
import type { PaymentMethod } from "@/config/pos.config";
import type { OrderType } from "@/types/shared";

export type CreateOrderPayload = {
  type: OrderType;
  paymentMethod: PaymentMethod;
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