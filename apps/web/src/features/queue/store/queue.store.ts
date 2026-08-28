import { create } from "zustand";
import type { QueueOrder } from "../types";

type QueueState = {
  orders: QueueOrder[];
  recent: QueueOrder[];
  setOrders: (orders: QueueOrder[]) => void;
  setRecent: (orders: QueueOrder[]) => void;
  replaceOrder: (order: QueueOrder) => void;
};

export const useQueueStore = create<QueueState>(function createQueueStore(set) {
  return {
    orders: [],
    recent: [],

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
  };
});