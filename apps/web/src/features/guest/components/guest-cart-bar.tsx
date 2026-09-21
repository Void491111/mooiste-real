"use client";

import { motion } from "motion/react";
import { SPRING } from "@/config/motion.config";
import { formatMoney } from "@/lib/format";

type Props = {
  count: number;
  total: number;
  onOpen: () => void;
};

export function GuestCartBar({ count, total, onOpen }: Props) {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={SPRING.snappy}
      className="fixed inset-x-0 bottom-0 z-30 p-3"
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex h-13 w-full items-center justify-between rounded-card bg-brand px-4 text-white shadow-lg"
      >
        <span className="text-sm font-semibold">
          {count} item · Lihat pesanan
        </span>
        <span className="text-sm font-bold tabular-nums">
          {formatMoney(total)}
        </span>
      </button>
    </motion.div>
  );
}