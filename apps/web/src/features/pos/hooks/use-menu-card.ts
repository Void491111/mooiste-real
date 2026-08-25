"use client";

import { STAGGER } from "@/config/motion.config";
import { makeLineId } from "../lib/cart";
import { useMenuQty } from "../store/cart.selectors";
import { useCartStore } from "../store/cart.store";
import type { Menu } from "../types";

export function useMenuCard(menu: Menu, index: number) {
  const qty = useMenuQty(menu.id);
  const add = useCartStore((state) => state.add);
  const setQty = useCartStore((state) => state.setQty);

  const isOut = menu.stock <= 0;
  const lineId = makeLineId(menu.id, "");

  function increase() {
    if (isOut) return;
    add(menu);
  }

  function decrease() {
    setQty(lineId, qty - 1);
  }

  return {
    qty,
    isOut,
    isSelected: qty > 0,
    canIncrease: qty < menu.stock,
    enterDelay: Math.min(index * STAGGER.grid.stop, STAGGER.grid.max),
    increase,
    decrease,
  };
}