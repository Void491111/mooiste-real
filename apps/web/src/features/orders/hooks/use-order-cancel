"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cancelOrder } from "../api/orders.api";
import type { OrderRow } from "../types";

export function useOrderCancel(onCancelled: () => void) {
  const [target, setTarget] = useState<OrderRow | null>(null);
  const [reason, setReason] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const canSubmit = reason.trim().length > 0;

  function ask(order: OrderRow) {
    setTarget(order);
    setReason("");
  }

  function close() {
    setTarget(null);
    setReason("");
  }

  async function confirm() {
    if (target === null || !canSubmit) return;

    setIsSaving(true);

    try {
      await cancelOrder(target.id, reason.trim());
      toast.success(`Pesanan ${target.number} dibatalkan`);
      close();
      onCancelled();
    } catch (caught) {
      toast.error(
        caught instanceof Error ? caught.message : "Gagal membatalkan pesanan",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return { target, reason, canSubmit, isSaving, ask, close, confirm, setReason };
}