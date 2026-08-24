"use client";

import { motion } from "motion/react";
import { POS_CONFIG } from "@/config/pos.config";
import { SPRING, VARIANTS } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { makeLineId } from "../lib/cart";
import { formatMoney } from "../lib/format";
import { useMenuQty } from "../store/cart.selector";
import { useCartStore } from "../store/cart.store";
import type { Menu } from "../types";
import { QtyStepper } from "./qty-stepper";

type Props = {
  menu: Menu;
};

export function MenuCard({ menu }: Props) {
  const qty = useMenuQty(menu.id);
  const add = useCartStore((state) => state.add);
  const setQty = useCartStore((state) => state.setQty);

  const isOut = menu.stock <= 0;
  const isSelected = qty > 0;
  const isLow = !isOut && menu.stock <= POS_CONFIG.stock.lowThreshold;
  const lineId = makeLineId(menu.id, "");

  function handleAdd() {
    if (isOut) return;
    add(menu);
  }

  function handleDecrease() {
    setQty(lineId, qty - 1);
  }

  function stopBubble(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <motion.div
      layout
      initial={VARIANTS.card.initial}
      animate={VARIANTS.card.animate}
      exit={VARIANTS.card.exit}
      transition={SPRING.snappy}
      whileTap={isOut ? undefined : { scale: 0.97 }}
      onClick={handleAdd}
      className={cn(
        "flex flex-col gap-2 rounded-2xl p-2.5 shadow-sm",
        isSelected ? "bg-selected ring-2 ring-selected-ring" : "bg-white",
        isOut ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
    >
      <div className="relative">
        <div className="grid aspect-square place-items-center rounded-xl bg-neutral-100 text-3xl font-bold text-neutral-300">
          {menu.name.slice(0, 1)}
        </div>

        <span
          className={cn(
            "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            isOut && "bg-danger-soft text-white",
            !isOut && isLow && "bg-white/90 text-danger-soft",
            !isOut && !isLow && "bg-white/90 text-stock-ok",
          )}
        >
          {isOut ? "Habis" : `Stok ${menu.stock}`}
        </span>

        {isSelected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={SPRING.snappy}
            className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-neutral-900 text-xs font-bold text-white"
          >
            {qty}
          </motion.span>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-neutral-900">{menu.name}</p>
        <p className="text-sm text-neutral-500">{formatMoney(menu.price)}</p>
      </div>

      <div onClick={stopBubble}>
        <QtyStepper
          qty={qty}
          onDecrease={handleDecrease}
          onIncrease={handleAdd}
          disabled={isOut}
          canIncrease={qty < menu.stock}
        />
      </div>
    </motion.div>
  );
}