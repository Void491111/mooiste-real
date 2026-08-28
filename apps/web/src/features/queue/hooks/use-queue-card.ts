"use client";

import { useState } from "react";
import { setOrderStatus, toggleQueueItem } from "../api/queue.api";
import { doneCount, elapsedMinutes, isStationDone, itemsOf, urgencyOf } from "../lib/queue";
import { useQueueStore } from "../store/queue.store";
import type { QueueOrder } from "../types";

export function useQueueCard(order: QueueOrder, now: number, onHandedOver: () => void) {
  const replaceOrder = useQueueStore((state) => state.replaceOrder);
  const [isBusy, setIsBusy] = useState(false);

  const barItems = itemsOf(order, "BAR");
  const kitchenItems = itemsOf(order, "KITCHEN");
  const minutes = elapsedMinutes(order.createdAt, now);

  async function toggle(itemId: string) {
    if (isBusy) return;
    setIsBusy(true);

    try {
      const updated = await toggleQueueItem(order.id, itemId);
      replaceOrder(updated);
    } finally {
      setIsBusy(false);
    }
  }

  async function handOver() {
    if (isBusy) return;
    setIsBusy(true);

    try {
      await setOrderStatus(order.id, "DONE");
      onHandedOver();
    } finally {
      setIsBusy(false);
    }
  }

  return {
    barItems,
    kitchenItems,
    minutes,
    urgency: urgencyOf(minutes),
    barDone: doneCount(barItems),
    isBarDone: isStationDone(order, "BAR"),
    isBusy,
    toggle,
    handOver,
  };
}