"use client";

import { motion } from "motion/react";
import { CARD_HOVER, SPRING, VARIANTS } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { useMenuCard } from "../hooks/use-menu-card";
import type { Menu } from "../types";
import { MenuCardFooter } from "./menu-card-footer";
import { MenuCardHeader } from "./menu-card-header";
import { MenuCardImage } from "./menu-card-image";

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
      animate={{
        ...VARIANTS.card.animate,
        transition: { ...SPRING.snappy, delay: card.enterDelay },
      }}
      exit={VARIANTS.card.exit}
      transition={SPRING.snappy}
      whileHover={card.isOut ? undefined : CARD_HOVER}
      whileTap={card.isOut ? undefined : { scale: 0.97 }}
      onClick={card.increase}
      className={cn(
        "group relative aspect-3/4 overflow-hidden rounded-card border shadow-sm transition-shadow duration-300",
        card.isOut
          ? "cursor-not-allowed border-border"
          : "cursor-pointer hover:shadow-lg",
        card.isSelected && !card.isOut && "border-selected-ring",
        !card.isSelected && "border-border",
      )}
    >
      <MenuCardImage src={menu.image} name={menu.name} isOut={card.isOut} />

      <MenuCardHeader
        stock={card.available}
        qty={card.qty}
        isOut={card.isOut}
        isSelected={card.isSelected}
      />

      <MenuCardFooter
        name={menu.name}
        price={menu.price}
        qty={card.qty}
        isOut={card.isOut}
        isSelected={card.isSelected}
        canIncrease={card.canIncrease}
        onDecrease={card.decrease}
        onIncrease={card.increase}
      />
    </motion.div>
  );
}