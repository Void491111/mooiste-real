"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { createOrder } from "../api/order.api";
import { useCartStore } from "../store/cart.store";

export function useCheckout(onSuccess?: () => void) {
  const items = useCartStore((state) => state.items);
  const orderType = useCartStore((state) => state.orderType);
  const clear = useCartStore((state) => state.clear);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastNumber, setLastNumber] = useState<string | null>(null);
  const idempotencyKey = useRef<string | null>(null);

  async function checkout() {
    if (items.length === 0 || isSubmitting) return;

    if (idempotencyKey.current === null) {
      idempotencyKey.current = crypto.randomUUID();
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const order = await createOrder({
        type: orderType,
        idempotencyKey: idempotencyKey.current,
        items: items.map(function toPayloadItem(item) {
          return { menuId: item.menuId, qty: item.qty, note: item.note };
        }),
      });

      setLastNumber(order.number);
      idempotencyKey.current = null;
      clear();
      toast.success(`Order ${order.number} masuk antrian`);
      onSuccess?.();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Checkout gagal";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { checkout, isSubmitting, error, lastNumber };
}