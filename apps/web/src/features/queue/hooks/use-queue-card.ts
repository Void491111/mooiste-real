"use client";

import { toast } from "sonner";
import { setOrderStatus, toggleQueueItem } from "../api/queue.api";
import {
  canHandOver,
  doneCount,
  elapsedMinutes,
  itemsOf,
  needsKitchenConfirm,
  urgencyOf,
} from "../lib/queue";
import { useQueueStore } from "../store/queue.store";
import type { QueueOrder } from "../types";

export function useQueueCard(order: QueueOrder, now: number, onHandedOver: () => void) {
  const replaceOrder = useQueueStore((state) => state.replaceOrder);
  const toggleItemLocal = useQueueStore((state) => state.toggleItemLocal);
  const removeOrderLocal = useQueueStore((state) => state.removeOrderLocal);
  const beginMutation = useQueueStore((state) => state.beginMutation);
  const endMutation = useQueueStore((state) => state.endMutation);

  const barItems = itemsOf(order, "BAR");
  const kitchenItems = itemsOf(order, "KITCHEN");
  const kitchenCheckable = needsKitchenConfirm(order.orderType);

  const requiredItems = kitchenCheckable ? [...barItems, ...kitchenItems] : barItems;
  const minutes = elapsedMinutes(order.createdAt, now);

  async function toggle(itemId: string) {
    toggleItemLocal(order.id, itemId);
    beginMutation();

    try {
      const updated = await toggleQueueItem(order.id, itemId);
      replaceOrder(updated);
    } catch {
      toggleItemLocal(order.id, itemId);
      toast.error("Gagal simpan centang");
    } finally {
      endMutation();
    }
  }

  async function handOver() {
    removeOrderLocal(order.id);
    beginMutation();

    try {
      await setOrderStatus(order.id, "DONE");
      toast.success(`${order.number} diserahkan`);
    } catch {
      toast.error("Gagal menyerahkan pesanan");
    } finally {
      endMutation();
      onHandedOver();
    }
  }

  return {
    barItems,
    kitchenItems,
    kitchenCheckable,
    minutes,
    urgency: urgencyOf(minutes),
    readyCount: doneCount(requiredItems),
    requiredCount: requiredItems.length,
    isReady: canHandOver(order),
    toggle,
    handOver,
  };
}