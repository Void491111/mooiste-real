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
      whileTap={{ scale: 0.99 }}
      transition={SPRING.snappy}
      className="flex w-full items-start gap-2.5 rounded-card px-1 py-1.5 text-left hover:bg-muted"
    >
      <span
        className={cn(
          "mt-px grid size-5 shrink-0 place-items-center rounded border transition-colors",
          item.isDone ? "border-stock-ok bg-stock-ok text-white" : "border-border",
        )}
      >
        {item.isDone && <Check className="size-3" strokeWidth={3} />}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-sm",
            item.isDone ? "text-muted-foreground line-through" : "text-foreground",
          )}
        >
          <span className="tabular-nums text-muted-foreground">{item.qty}</span> {item.name}
        </span>

        {item.note !== "" && (
          <span
            className={cn(
              "mt-0.5 block truncate text-xs",
              item.isDone ? "text-muted-foreground/60" : "text-note",
            )}
          >
            {item.note}
          </span>
        )}
      </span>
    </motion.button>
  );
}