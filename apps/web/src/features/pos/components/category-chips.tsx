"use client";

import { motion } from "motion/react";
import { CATEGORIES } from "@/config/pos.config";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import type { CategoryFilter } from "../types";

type Props = {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
};

export function CategoryChips({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5 xl:gap-2">
      {CATEGORIES.map(function renderChip(category) {
        const isActive = category.value === value;

        return (
          <motion.button
            key={category.value}
            type="button"
            whileTap={{ scale: 0.93 }}
            transition={SPRING.crisp}
            onClick={function selectCategory() {
              onChange(category.value);
            }}
            className={cn(
              "relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 xl:px-4 xl:py-2 xl:text-sm",
              isActive ? "text-white" : "text-neutral-500 hover:text-neutral-900",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="chip-active"
                transition={SPRING.crisp}
                className="absolute inset-0 rounded-full bg-brand"
              />
            )}
            <span className="relative">{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}