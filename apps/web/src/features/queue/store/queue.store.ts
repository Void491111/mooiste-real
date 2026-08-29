import { create } from "zustand";
import { toggleItemIn } from "../lib/queue";
import type { QueueOrder } from "../types";

type QueueState = {
  orders: QueueOrder[];
  recent: QueueOrder[];
  pending: number;
  setOrders: (orders: QueueOrder[]) => void;
  setRecent: (orders: QueueOrder[]) => void;
  replaceOrder: (order: QueueOrder) => void;
  toggleItemLocal: (orderId: string, itemId: string) => void;
  removeOrderLocal: (orderId: string) => void;
  beginMutation: () => void;
  endMutation: () => void;
};

export const useQueueStore = create<QueueState>(function createQueueStore(set) {
  return {
    orders: [],
    recent: [],
    pending: 0,

    setOrders: function setQueueOrders(orders) {
      set({ orders });
    },

    setRecent: function setRecentOrders(recent) {
      set({ recent });
    },

    replaceOrder: function replaceQueueOrder(order) {
      set((state) => ({
        orders: state.orders.map((current) => (current.id === order.id ? order : current)),
      }));
    },

    toggleItemLocal: function toggleLocally(orderId, itemId) {
      set((state) => ({ orders: toggleItemIn(state.orders, orderId, itemId) }));
    },

    removeOrderLocal: function removeLocally(orderId) {
      set((state) => ({ orders: state.orders.filter((order) => order.id !== orderId) }));
    },

    beginMutation: function startMutation() {
      set((state) => ({ pending: state.pending + 1 }));
    },

    endMutation: function finishMutation() {
      set((state) => ({ pending: Math.max(state.pending - 1, 0) }));
    },
  };
});