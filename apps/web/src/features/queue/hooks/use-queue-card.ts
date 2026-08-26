"use client";

import { doneCount, elapsedMinutes, isStationDone, itemsOf, urgencyOf } from "../lib/queue";
import { useQueueStore } from "../store/queue.store";
import type { QueueOrder } from "../types";

export function useQueueCard(order: QueueOrder, now: number) {
  const toggleItem = useQueueStore((state) => state.toggleItem);
  const markStationDone = useQueueStore((state) => state.markStationDone);
  const handOverOrder = useQueueStore((state) => state.handOver);

  const barItems = itemsOf(order, "BAR");
  const kitchenItems = itemsOf(order, "KITCHEN");
  const minutes = elapsedMinutes(order.createdAt, now);

  function toggle(itemId: string) {
    toggleItem(order.id, itemId);
  }

  function finishBar() {
    markStationDone(order.id, "BAR");
  }

  function handOver() {
    handOverOrder(order.id);
  }

  return {
    barItems,
    kitchenItems,
    minutes,
    urgency: urgencyOf(minutes),
    barDone: doneCount(barItems),
    isBarDone: isStationDone(order, "BAR"),
    toggle,
    finishBar,
    handOver,
  };
}