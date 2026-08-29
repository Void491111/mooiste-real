"use client";

import { motion } from "motion/react";
import { SPRING, VARIANTS } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { orderTypeLabel } from "@/types/shared";
import { useQueueCard } from "../hooks/use-queue-card";
import type { QueueOrder } from "../types";
import { QueueItemRow } from "./queue-item-row";
import { QueueKitchenList } from "./queue-kitchen-list";
import { QueueTimer } from "./queue-timer";

type Props = {
  order: QueueOrder;
  now: number;
  onHandedOver: () => void;
};

export function QueueCard({ order, now, onHandedOver }: Props) {
  const card = useQueueCard(order, now, onHandedOver);
  const canHandOver = card.isBarDone;

  return (
    <motion.article
      layout
      initial={VARIANTS.card.initial}
      animate={VARIANTS.card.animate}
      exit={VARIANTS.card.exit}
      transition={SPRING.snappy}
      className={cn(
        "flex flex-col gap-2 rounded-card border bg-card p-3",
        card.urgency === "late" ? "border-danger-soft" : "border-border",
      )}
    >
      <header className="flex items-center gap-2">
        <span className="text-base font-semibold text-foreground">{order.number}</span>
        <span className="truncate text-xs text-muted-foreground">
          {orderTypeLabel(order.orderType)}
        </span>
        <QueueTimer minutes={card.minutes} urgency={card.urgency} />
      </header>

      <div>
        {card.barItems.map(function renderBarItem(item) {
          return <QueueItemRow key={item.id} item={item} onToggle={card.toggle} />;
        })}
      </div>

      <QueueKitchenList items={card.kitchenItems} />

      <motion.button
        type="button"
        disabled={!canHandOver}
        onClick={card.handOver}
        whileTap={canHandOver ? { scale: 0.98 } : undefined}
        transition={SPRING.snappy}
        className={cn(
          "mt-auto h-9 w-full rounded-card text-xs font-medium transition-colors",
          canHandOver
            ? "bg-brand text-white hover:bg-brand-soft"
            : "text-muted-foreground/60",
        )}
      >
        {card.isBarDone ? "Serahkan" : `Siap ${card.barDone}/${card.barItems.length}`}
      </motion.button>
    </motion.article>
  );
}