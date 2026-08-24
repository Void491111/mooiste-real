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

export const useCartStore = create<CartState>((set) => ({
  items: [],
  orderType: "DINE_IN",
  add: (menu) => set((state) => ({ items: cart.addItem(state.items, menu) })),
  setQty: (lineId, qty) => set((state) => ({ items: cart.setQty(state.items, lineId, qty) })),
  setNote: (lineId, note) => set((state) => ({ items: cart.setNote(state.items, lineId, note) })),
  remove: (lineId) => set((state) => ({ items: cart.removeItem(state.items, lineId) })),
  clear: () => set({ items: [] }),
  setOrderType: (orderType) => set({ orderType }),
}));