import { apiGet, apiPost } from "@/lib/api";
import type { GuestMenu, GuestOrder } from "../types";

type CreateGuestOrderPayload = {
  type: "DINE_IN" | "TAKEAWAY";
  tableNumber: string;
  items: { menuId: string; qty: number; note?: string }[];
};

export function getGuestMenus() {
  return apiGet<GuestMenu[]>("/public/menus");
}

export function createGuestOrder(payload: CreateGuestOrderPayload) {
  return apiPost<GuestOrder>("/public/orders", payload);
}

export function getGuestOrder(orderId: string) {
  return apiGet<GuestOrder>(`/public/orders/${orderId}`);
}