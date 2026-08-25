"use client";

import { motion } from "motion/react";
import { SquarePen } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import { stopBubble } from "../lib/dom";

type Props = {
  stock: number;
  qty: number;
  isOut: boolean;
  isSelected: boolean;
  onEdit?: () => void;
};

export function MenuCardHeader({ stock, qty, isOut, isSelected, onEdit }: Props) {
  if (isOut) {
    return (
      <div className="flex h-8 items-center">
        <div className="w-full rounded-xl bg-danger-soft py-1.5 text-center text-xs font-semibold text-neutral-700">
          Out Of Stock
        </div>
      </div>
    );
  }

  if (isSelected) {
    return (
      <div className="flex h-8 items-center justify-between">
        <motion.span
          key={qty}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={SPRING.snappy}
          className="grid size-7 place-items-center rounded-full bg-neutral-900 text-xs font-bold text-white"
        >
          {qty}
        </motion.span>

        <motion.button
          type="button"
          aria-label="Catatan menu"
          onClick={function handleEdit(event) {
            stopBubble(event);
            onEdit?.();
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          transition={SPRING.snappy}
          className="grid size-7 place-items-center rounded-lg text-neutral-900"
        >
          <SquarePen className="size-5" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex h-8 items-center justify-end">
      <span className="rounded-full border-2 border-stock-ok bg-white px-2.5 py-0.5 text-[11px] font-bold">
        <span className="text-neutral-900">Stock: </span>
        <span className="text-stock-ok">{stock}</span>
      </span>
    </div>
  );
}