import { create } from "zustand";
import * as cart from "../lib/cart";
import type { CartItem, Menu, OrderType } from "../types";

type CartState = {
  items: CartItem[];
  orderType: OrderType;
  add: (menu: Menu) => void;
  setQty: (lineId: string, qty: number) => void;
  setNote: (lineId: string, note: string) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  setOrderType: (orderType: OrderType) => void;
};

export const useCartStore = create<CartState>(function createCartStore(set) {
  return {
    items: [],
    orderType: "DINE_IN",

    add: function addMenu(menu) {
      set(function applyAdd(state) {
        return { items: cart.addItem(state.items, menu) };
      });
    },

    setQty: function changeQty(lineId, qty) {
      set(function applySetQty(state) {
        return { items: cart.setQty(state.items, lineId, qty) };
      });
    },

    setNote: function changeNote(lineId, note) {
      set(function applySetNote(state) {
        return { items: cart.setNote(state.items, lineId, note) };
      });
    },

    remove: function removeLine(lineId) {
      set(function applyRemove(state) {
        return { items: cart.removeItem(state.items, lineId) };
      });
    },

    clear: function clearCart() {
      set({ items: [] });
    },

    setOrderType: function changeOrderType(orderType) {
      set({ orderType });
    },
  };
});