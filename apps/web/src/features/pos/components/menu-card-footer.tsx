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
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 border-t border-white/20 bg-glass px-3 py-2.5 backdrop-blur-md">
      <div className="min-w-0">
        <p
          className={cn(
            "truncate text-[15px] font-bold",
            isOut ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {name}
        </p>
        <p
          className={cn(
            "text-sm",
            isOut ? "text-muted-foreground" : "text-foreground/70",
          )}
        >
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