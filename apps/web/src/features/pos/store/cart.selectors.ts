import { calcTotals, qtyOfMenu } from "../lib/cart";
import { useCartStore } from "./cart.store";

export function useCartTotals() {
    const items = useCartStore((state) => state.items);
    return calcTotals(items);
}

export function useMenuQty(menuId: string) {
    const items = useCartStore((state) => state.items);
    return qtyOfMenu(items, menuId);
}