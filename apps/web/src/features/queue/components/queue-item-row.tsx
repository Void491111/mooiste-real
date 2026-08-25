"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import type { QueueItem } from "../types";

type Props = {
  item: QueueItem;
  onToggle: (itemId: string) => void;
};

export function QueueItemRow({ item, onToggle }: Props) {
  return (
    <motion.button
      type="button"
      onClick={function handleToggle() {
        onToggle(item.id);
      }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING.snappy}
      className={cn(
        "flex w-full items-start gap-3 rounded-card p-2.5 text-left transition-colors",
        item.isDone ? "bg-muted/50" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors",
          item.isDone ? "border-stock-ok bg-stock-ok text-white" : "border-border",
        )}
      >
        {item.isDone && <Check className="size-4" strokeWidth={3} />}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "flex items-baseline gap-2 text-[15px] font-bold",
            item.isDone ? "text-muted-foreground line-through" : "text-foreground",
          )}
        >
          <span className="tabular-nums">{item.qty}×</span>
          <span className="truncate">{item.name}</span>
        </span>

        {item.note !== "" && (
          <span
            className={cn(
              "mt-1 block rounded-md px-2 py-1 text-sm font-semibold",
              item.isDone ? "text-muted-foreground" : "bg-selected text-foreground",
            )}
          >
            {item.note}
          </span>
        )}
      </span>
    </motion.button>
  );
}