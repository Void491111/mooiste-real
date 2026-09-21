"use client";

import { useEffect, useState } from "react";
import { GUEST_CONFIG } from "@/config/guest.config";
import { getGuestOrder } from "../api/guest.api";
import type { GuestOrder } from "../types";

export function useGuestOrder(orderId: string | null) {
  const [order, setOrder] = useState<GuestOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    function pollOrder() {
      if (orderId === null) return;

      let isActive = true;

      async function check() {
        try {
          const data = await getGuestOrder(orderId!);
          if (isActive) setOrder(data);
        } catch (cause) {
          if (!isActive) return;
          setError(
            cause instanceof Error ? cause.message : "Gagal memuat pesanan",
          );
        }
      }

      void check();
      const timer = window.setInterval(check, GUEST_CONFIG.pollMs);

      return function stopPolling() {
        isActive = false;
        window.clearInterval(timer);
      };
    },
    [orderId],
  );

  return { order, error };
}