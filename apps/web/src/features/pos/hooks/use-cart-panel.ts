"use client"

import { useCartTotals } from "../store/cart.selectors"
import { useCartStore } from "../store/cart.store";

export function useCartPanel() {
    const items = useCartStore((state) => state.items);
    const orderType = useCartStore((state) => state.orderType);
    const setOrderType = useCartStore((state) => state.setOrderType);
    const clear = useCartStore((state) => state.clear);
    const totals = useCartTotals();

    return {
        items,
        orderType,
        totals,
        isEmpty: items.length === 0,
        setOrderType,
        clear,
    };
}