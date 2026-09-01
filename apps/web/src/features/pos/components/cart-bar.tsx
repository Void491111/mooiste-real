"use client";

import { ShoppingBag } from "lucide-react";
import { formatMoney } from "@/lib/format";
import { useCartPanel } from "../hooks/use-cart-panel";

type Props = {
  onOpen: () => void;
};

export function CartBar({ onOpen }: Props) {
  const panel = useCartPanel();
  const itemCount = panel.isReady ? panel.totals.itemCount : 0;
  const total = panel.isReady ? panel.totals.total : 0;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-between gap-3 border-t border-border bg-card px-4 lg:hidden"
    >
      <span className="flex items-center gap-2 text-sm">
        <ShoppingBag className="size-4 text-muted-foreground" />
        <span className="font-bold text-foreground">{itemCount}</span>
        <span className="text-muted-foreground">item</span>
      </span>

      <span className="flex items-center gap-3">
        <span className="text-sm font-bold tabular-nums text-foreground">
          {formatMoney(total)}
        </span>
        <span className="rounded-card bg-brand px-3 py-1.5 text-xs font-bold text-white">
          Lihat pesanan
        </span>
      </span>
    </button>
  );
}