"use client";

import { motion } from "motion/react";
import { SPRING } from "@/config/motion.config";

type Props = {
  stock: number;
  qty: number;
  isOut: boolean;
  isSelected: boolean;
};

export function MenuCardHeader({ stock, qty, isOut, isSelected }: Props) {
  return (
    <>
      {isSelected && !isOut ? (
        <motion.span
          key={qty}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={SPRING.snappy}
          className="absolute left-2 top-2 z-10 grid size-6 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background shadow-sm"
        >
          {qty}
        </motion.span>
      ) : null}

      {isOut ? (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-bold text-danger-soft-fg shadow-sm">
          Habis
        </span>
      ) : (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-card/95 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-stock-ok shadow-sm">
          {stock}
        </span>
      )}
    </>
  );
}