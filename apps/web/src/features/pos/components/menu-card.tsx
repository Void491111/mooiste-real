"use client";

import { motion } from "motion/react";
import { CARD_HOVER, SPRING, VARIANTS } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { useMenuCard } from "../hooks/use-menu-card";
import { stopBubble } from "../lib/dom";
import { formatMoney } from "../lib/format";
import type { Menu } from "../types";
import { MenuCardHeader } from "./menu-card-header";
import { QtyStepper } from "./qty-stepper";
import { POS_CONFIG } from "@/config/pos.config";

type Props = {
  menu: Menu;
  index: number;
};

export function MenuCard({ menu, index }: Props) {
  const card = useMenuCard(menu, index);

  return (
        <motion.div
      layout
      initial={VARIANTS.card.initial}
      animate={{ ...VARIANTS.card.animate, transition: { ...SPRING.snappy, delay: card.enterDelay } }}
      exit={VARIANTS.card.exit}
      transition={SPRING.snappy}
      whileTap={card.isOut ? undefined : { scale: 0.97 }}
      onClick={card.increase}
      whileHover={card.isOut ? undefined : CARD_HOVER}
      className={cn(
        "group flex flex-col gap-1 rounded-card border p-3 shadow-sm transition-shadow duration-300",
        !card.isOut && "hover:shadow-lg",
        card.isSelected && "border-selected-ring bg-selected",
        !card.isSelected && !card.isOut && "border-neutral-200 bg-white",
        card.isOut ? "cursor-not-allowed border-neutral-200 bg-neutral-100" : "cursor-pointer",
      )}
    >
      <MenuCardHeader
        stock={card.available}
        qty={card.qty}
        isOut={card.isOut}
        isSelected={card.isSelected}
      />

      <div className={cn("grid aspect-4/3 place-items-center", card.isOut && "opacity-45")}>
        <div className="grid size-20 place-items-center rounded-2xl bg-neutral-200/60 text-3xl font-bold text-neutral-400">
          {menu.name.slice(0, 1)}
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className={cn("truncate text-[15px] font-bold", card.isOut ? "text-neutral-400" : "text-neutral-900")}>
            {menu.name}
          </p>
          <p className={cn("text-sm", card.isOut ? "text-neutral-400" : "text-neutral-500")}>
            {formatMoney(menu.price)}
          </p>
        </div>

        <div onClick={stopBubble} className="shrink-0">
          <QtyStepper
            qty={card.qty}
            onDecrease={card.decrease}
            onIncrease={card.increase}
            disabled={card.isOut}
            canIncrease={card.canIncrease}
          />
        </div>
      </div>
    </motion.div>
  );
}