import { create } from "zustand";
import * as queue from "../lib/queue";
import type { QueueOrder, Station } from "../types";

type QueueState = {
  orders: QueueOrder[];
  seed: (orders: QueueOrder[]) => void;
  toggleItem: (orderId: string, itemId: string) => void;
  markStationDone: (orderId: string, station: Station) => void;
  removeOrder: (orderId: string) => void;
};

export const useQueueStore = create<QueueState>(function createQueueStore(set) {
  return {
    orders: [],

    seed: function seedOrders(orders) {
      set({ orders });
    },

    toggleItem: function toggleQueueItem(orderId, itemId) {
      set((state) => ({ orders: queue.toggleItem(state.orders, orderId, itemId) }));
    },

    markStationDone: function finishStation(orderId, station) {
      set((state) => ({ orders: queue.markStationDone(state.orders, orderId, station) }));
    },

    removeOrder: function dropOrder(orderId) {
      set((state) => ({ orders: queue.removeOrder(state.orders, orderId) }));
    },
  };
});