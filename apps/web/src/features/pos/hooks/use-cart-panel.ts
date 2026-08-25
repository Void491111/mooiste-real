"use client";

import { useState } from "react";
import { useCartTotals } from "../store/cart.selectors";
import { useCartStore } from "../store/cart.store";

export function useCartPanel() {
  const items = useCartStore((state) => state.items);
  const orderType = useCartStore((state) => state.orderType);
  const setOrderType = useCartStore((state) => state.setOrderType);
  const clear = useCartStore((state) => state.clear);
  const totals = useCartTotals();

  const [isClearOpen, setIsClearOpen] = useState(false);

  function askClear() {
    setIsClearOpen(true);
  }

  function cancelClear() {
    setIsClearOpen(false);
  }

  function confirmClear() {
    clear();
    setIsClearOpen(false);
  }

  return {
    items,
    orderType,
    totals,
    isEmpty: items.length === 0,
    isClearOpen,
    setOrderType,
    askClear,
    cancelClear,
    confirmClear,
  };
}