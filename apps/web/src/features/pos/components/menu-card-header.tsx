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
  if (isOut) {
    return (
      <div className="w-full rounded-card bg-danger-soft py-1.5 text-center text-xs font-semibold text-danger-soft-fg">
        Out Of Stock
      </div>  
    );
  }

  return (
    <div className="flex h-8 items-center justify-between">
      {isSelected && (
        <motion.span
          key={qty}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={SPRING.snappy}
          className="grid size-7 place-items-center rounded-full bg-neutral-900 text-xs font-bold text-white"
        >
          {qty}
        </motion.span>
      )}

      <span className="ml-auto rounded-full border-2 border-stock-ok bg-card px-2.5 py-0.5 text-[11px] font-bold">
        <span className="text-foreground">Stock: </span>
        <span className="text-stock-ok">{stock}</span>
      </span>
    </div>
  );
}