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
    <div className="flex gap-2 overflow-x-auto pb-1">
      {CATEGORIES.map(function renderChip(category) {
        const isActive = category.value === value;

        return (
          <button
            key={category.value}
            type="button"
            onClick={function selectCategory() {
              onChange(category.value);
            }}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-neutral-500 hover:text-neutral-900",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="chip-active"
                transition={SPRING.snappy}
                className="absolute inset-0 rounded-full bg-brand"
              />
            )}
            <span className="relative">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}