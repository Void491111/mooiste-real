"use client";

import { STAGGER } from "@/config/motion.config";
import { availableStock, makeLineId } from "../lib/cart";
import { useMenuQty } from "../store/cart.selectors";
import { useCartStore } from "../store/cart.store";
import type { Menu } from "../types";

export function useMenuCard(menu: Menu, index: number) {
  const qty = useMenuQty(menu.id);
  const add = useCartStore((state) => state.add);
  const setQty = useCartStore((state) => state.setQty);

  const isOut = menu.stock <= 0;
  const lineId = makeLineId(menu.id, "");
  const available = availableStock(menu.stock, qty);

  function increase() {
    if (isOut) return;
    add(menu);
  }

  function decrease() {
    setQty(lineId, qty - 1);
  }

  

  return {
    qty,
    available,
    isOut,
    isSelected: qty > 0,
    canIncrease: available > 0,
    enterDelay: Math.min(index * STAGGER.grid.stop, STAGGER.grid.max),
    increase,
    decrease,
  };
}