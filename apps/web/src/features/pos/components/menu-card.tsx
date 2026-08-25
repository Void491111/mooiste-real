"use client";

import { AnimatePresence, motion } from "motion/react";
import { CARD_HOVER, SPRING, STEPPER_REVEAL, VARIANTS } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { useMenuCard } from "../hooks/use-menu-card";
import { stopBubble } from "../lib/dom";
import { formatMoney } from "../lib/format";
import type { Menu } from "../types";
import { MenuCardHeader } from "./menu-card-header";
import { QtyStepper } from "./qty-stepper";

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
      whileHover={card.isOut ? undefined : CARD_HOVER}
      whileTap={card.isOut ? undefined : { scale: 0.97 }}
      onClick={card.increase}
      className={cn(
        "group flex flex-col gap-1 rounded-card border p-3 shadow-sm transition-shadow duration-300",
        !card.isOut && "hover:shadow-lg",
        card.isSelected && "border-selected-ring bg-selected",
        !card.isSelected && !card.isOut && "border-border bg-card",
        card.isOut ? "cursor-not-allowed border-border bg-muted" : "cursor-pointer",
      )}
    >
      <MenuCardHeader
        stock={card.available}
        qty={card.qty}
        isOut={card.isOut}
        isSelected={card.isSelected}
      />

      <div className={cn("grid aspect-4/3 place-items-center", card.isOut && "opacity-45")}>
        <div className="grid size-20 place-items-center rounded-card bg-muted-foreground/15 text-3xl font-bold text-muted-foreground/60 transition-transform duration-500 ease-out group-hover:scale-110">
          {menu.name.slice(0, 1)}
        </div>
      </div>

      <motion.div layout className="flex items-end justify-between gap-2">
        <motion.div layout className="min-w-0">
          <p className={cn("truncate text-[15px] font-bold", card.isOut ? "text-muted-foreground/60" : "text-foreground")}>
            {menu.name}
          </p>
          <p className={cn("text-sm", card.isOut ? "text-muted-foreground/60" : "text-muted-foreground")}>
            {formatMoney(menu.price)}
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {card.isSelected && !card.isOut && (
            <motion.div
              key="stepper"
              layout
              initial={STEPPER_REVEAL.initial}
              animate={STEPPER_REVEAL.animate}
              exit={STEPPER_REVEAL.exit}
              transition={SPRING.crisp}
              onClick={stopBubble}
              className="shrink-0"
            >
              <QtyStepper
                qty={card.qty}
                onDecrease={card.decrease}
                onIncrease={card.increase}
                canIncrease={card.canIncrease}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}