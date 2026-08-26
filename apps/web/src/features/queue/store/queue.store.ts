import { create } from "zustand";
import { QUEUE_CONFIG } from "@/config/queue.config";
import * as queue from "../lib/queue";
import type { QueueOrder, Station } from "../types";

type QueueState = {
  orders: QueueOrder[];
  recent: QueueOrder[];
  seed: (orders: QueueOrder[]) => void;
  toggleItem: (orderId: string, itemId: string) => void;
  markStationDone: (orderId: string, station: Station) => void;
  handOver: (orderId: string) => void;
  restore: (orderId: string) => void;
};

export const useQueueStore = create<QueueState>(function createQueueStore(set) {
  return {
    orders: [],
    recent: [],

    seed: function seedOrders(orders) {
      set({ orders });
    },

    toggleItem: function toggleQueueItem(orderId, itemId) {
      set((state) => ({ orders: queue.toggleItem(state.orders, orderId, itemId) }));
    },

    markStationDone: function finishStation(orderId, station) {
      set((state) => ({ orders: queue.markStationDone(state.orders, orderId, station) }));
    },

    handOver: function handOverOrder(orderId) {
      set((state) => queue.moveToRecent(state.orders, state.recent, orderId, QUEUE_CONFIG.recent.limit));
    },

    restore: function restoreOrder(orderId) {
      set((state) => queue.restoreFromRecent(state.orders, state.recent, orderId));
    },
  };
});