"use client";

import { AnimatePresence, motion } from "motion/react";
import { SPRING, STEPPER_REVEAL } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { stopBubble } from "../lib/dom";
import { formatMoney } from "../lib/format";
import { QtyStepper } from "./qty-stepper";

type Props = {
  name: string;
  price: number;
  qty: number;
  isOut: boolean;
  isSelected: boolean;
  canIncrease: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function MenuCardFooter({
  name,
  price,
  qty,
  isOut,
  isSelected,
  canIncrease,
  onDecrease,
  onIncrease,
}: Props) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-2 px-3 py-2">
      <div className="min-w-0">
        <p
          className={cn(
            "truncate text-sm font-semibold",
            isOut ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {name}
        </p>
        <p className="text-xs tabular-nums text-muted-foreground">
          {formatMoney(price)}
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {isSelected && !isOut ? (
          <motion.div
            key="stepper"
            initial={STEPPER_REVEAL.initial}
            animate={STEPPER_REVEAL.animate}
            exit={STEPPER_REVEAL.exit}
            transition={SPRING.crisp}
            onClick={stopBubble}
            className="shrink-0"
          >
            <QtyStepper
              qty={qty}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              canIncrease={canIncrease}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}