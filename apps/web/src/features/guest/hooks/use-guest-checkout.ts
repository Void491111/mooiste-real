"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createGuestOrder } from "../api/guest.api";
import { useGuestCartStore } from "../store/guest-cart.store";

type OrderType = "DINE_IN" | "TAKEAWAY";

export function useGuestCheckout(tableNumber: string) {
  const router = useRouter();
  const items = useGuestCartStore((state) => state.items);
  const clear = useGuestCartStore((state) => state.clear);
  const setActiveOrder = useGuestCartStore((state) => state.setActiveOrder);

  const [orderType, setOrderType] = useState<OrderType>("DINE_IN");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (items.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const order = await createGuestOrder({
        type: orderType,
        tableNumber,
        items: items.map(function toPayloadItem(item) {
          return { menuId: item.menuId, qty: item.qty, note: item.note };
        }),
      });

      setActiveOrder(order.id);
      clear();
      router.push(`/m/${tableNumber}/status`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Gagal mengirim pesanan");
      setIsSubmitting(false);
    }
  }

  return { orderType, setOrderType, isSubmitting, error, submit };
}