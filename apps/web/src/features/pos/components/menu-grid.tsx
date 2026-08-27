"use client";

import { AnimatePresence } from "motion/react";
import { POS_CONFIG } from "@/config/pos.config";
import type { Menu } from "../types";
import { MenuCard } from "./menu-card";

type Props = {
  menus: Menu[];
};

export function MenuGrid({ menus }: Props) {
  if (menus.length === 0) {
    return (
      <div className="grid flex-1 place-items-center rounded-card border border-dashed border-border text-sm text-muted-foreground/60">
        Menu ga ketemu
      </div>
    );
  }

  return (
    <div
      className="grid flex-1 auto-rows-min content-start gap-3 overflow-y-auto pb-2"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${POS_CONFIG.grid.cardWidth}px, 1fr))` }}
    >
      <AnimatePresence mode="popLayout">
        {menus.map(function renderCard(menu, index) {
          return <MenuCard key={menu.id} menu={menu} index={index} />;
        })}
      </AnimatePresence>
    </div>
  );
}