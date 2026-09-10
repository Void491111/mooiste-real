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
    <div className="absolute inset-x-0 top-0 flex h-11 items-center justify-between gap-2 border-b border-white/20 bg-glass px-2.5 backdrop-blur-md">
      {isSelected && !isOut ? (
        <motion.span
          key={qty}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={SPRING.snappy}
          className="grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background"
        >
          {qty}
        </motion.span>
      ) : null}

      {isOut ? (
        <span className="ml-auto rounded-full bg-danger-soft px-2.5 py-0.5 text-[11px] font-bold text-danger-soft-fg">
          Habis
        </span>
      ) : (
        <span className="ml-auto rounded-full border-2 border-stock-ok bg-card/80 px-2.5 py-0.5 text-[11px] font-bold">
          <span className="text-foreground">Stock: </span>
          <span className="text-stock-ok">{stock}</span>
        </span>
      )}
    </div>
  );
}