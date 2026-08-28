"use client";

import { useCallback, useEffect, useState } from "react";
import { useNow } from "@/hooks/use-now";
import { getQueue, getRecent, setOrderStatus } from "../api/queue.api";
import { useQueueStore } from "../store/queue.store";

export function useQueueBoard() {
  const orders = useQueueStore((state) => state.orders);
  const recent = useQueueStore((state) => state.recent);
  const setOrders = useQueueStore((state) => state.setOrders);
  const setRecent = useQueueStore((state) => state.setRecent);

  const now = useNow();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async function loadQueue() {
      try {
        setError(null);
        const [queue, done] = await Promise.all([getQueue(), getRecent()]);
        setOrders(queue);
        setRecent(done);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Gagal memuat antrian");
      } finally {
        setIsLoading(false);
      }
    },
    [setOrders, setRecent],
  );

  useEffect(
    function refetchOnTick() {
      if (now === null) return;
      load();
    },
    [now, load],
  );

  async function restore(orderId: string) {
    await setOrderStatus(orderId, "PAID");
    await load();
  }

  return {
    now,
    orders,
    recent,
    isLoading,
    error,
    isEmpty: orders.length === 0,
    refetch: load,
    restore,
  };
}