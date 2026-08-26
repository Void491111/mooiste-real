"use client";

import { useEffect } from "react";
import { useNow } from "@/hooks/use-now";
import { seedOrders, sortByOldest } from "../lib/queue";
import { QUEUE_MOCK } from "../mock/orders.mock";
import { useQueueStore } from "../store/queue.store";

export function useQueueBoard() {
  const orders = useQueueStore((state) => state.orders);
  const seed = useQueueStore((state) => state.seed);
  const now = useNow();
  const recent = useQueueStore((state) => state.recent);
  const restore = useQueueStore((state) => state.restore);

  useEffect(
    function seedFromMock() {
      if (now === null || orders.length > 0) return;
      seed(seedOrders(QUEUE_MOCK, now));
    },
    [now, orders.length, seed],
  );

  return {
    now,
    orders: sortByOldest(orders),
    isReady: now !== null,
    isEmpty: now !== null && orders.length === 0,
    recent,
    restore,
  };
}