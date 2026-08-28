"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SPRING } from "@/config/motion.config";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function OrderPagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex shrink-0 items-center justify-end gap-2">
      <motion.button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={page <= 1}
        onClick={function goPrevious() {
          onChange(page - 1);
        }}
        whileTap={page > 1 ? { scale: 0.9 } : undefined}
        transition={SPRING.snappy}
        className="grid size-8 place-items-center rounded-card border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
      >
        <ChevronLeft className="size-4" />
      </motion.button>

      <span className="text-xs tabular-nums text-muted-foreground">
        {page} / {totalPages}
      </span>

      <motion.button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={page >= totalPages}
        onClick={function goNext() {
          onChange(page + 1);
        }}
        whileTap={page < totalPages ? { scale: 0.9 } : undefined}
        transition={SPRING.snappy}
        className="grid size-8 place-items-center rounded-card border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
      >
        <ChevronRight className="size-4" />
      </motion.button>
    </div>
  );
}