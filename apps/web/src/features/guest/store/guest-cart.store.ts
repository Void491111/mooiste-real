import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as cart from "../lib/guest-cart";
import type { GuestCartItem, GuestMenu } from "../types";

type GuestCartState = {
  tableNumber: string;
  items: GuestCartItem[];
  activeOrderId: string | null;
  openTable: (tableNumber: string) => void;
  add: (menu: GuestMenu, qty: number, note: string) => void;
  setQty: (menuId: string, qty: number) => void;
  clear: () => void;
  setActiveOrder: (orderId: string | null) => void;
};

export const useGuestCartStore = create<GuestCartState>()(
  persist(
    function createGuestCartStore(set) {
      return {
        tableNumber: "",
        items: [],
        activeOrderId: null,

        // Ganti meja artinya pelanggan lain. Keranjang dan pesanan
        // aktif dibuang, biar pesanan meja sebelumnya tidak terbawa.
        openTable: function openTable(tableNumber) {
          set(function applyTable(state) {
            if (state.tableNumber === tableNumber) return { tableNumber };
            return { tableNumber, items: [], activeOrderId: null };
          });
        },

        add: function addMenu(menu, qty, note) {
          set(function applyAdd(state) {
            return { items: cart.addItem(state.items, menu, qty, note) };
          });
        },

        setQty: function changeQty(menuId, qty) {
          set(function applySetQty(state) {
            return { items: cart.setQty(state.items, menuId, qty) };
          });
        },

        clear: function clearCart() {
          set({ items: [] });
        },

        setActiveOrder: function setActiveOrder(orderId) {
          set({ activeOrderId: orderId });
        },
      };
    },
    {
      name: "mooiste-guest",
      skipHydration: true,
      partialize: function pickPersisted(state) {
        return {
          tableNumber: state.tableNumber,
          items: state.items,
          activeOrderId: state.activeOrderId,
        };
      },
    },
  ),
);