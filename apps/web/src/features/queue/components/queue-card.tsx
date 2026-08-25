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
};

export function QueueCard({ order, now }: Props) {
  const card = useQueueCard(order, now);

  return (
    <motion.article
      layout
      initial={VARIANTS.card.initial}
      animate={VARIANTS.card.animate}
      exit={VARIANTS.card.exit}
      transition={SPRING.snappy}
      className={cn(
        "flex flex-col gap-3 rounded-card border bg-card p-3 shadow-sm",
        card.urgency === "late" ? "border-danger-soft" : "border-border",
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <div>
          <p className="text-2xl font-bold leading-none text-foreground">{order.number}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {orderTypeLabel(order.orderType)}
          </p>
        </div>

        <QueueTimer minutes={card.minutes} urgency={card.urgency} />
      </header>

      <div className="space-y-1.5">
        {card.barItems.map(function renderBarItem(item) {
          return <QueueItemRow key={item.id} item={item} onToggle={card.toggle} />;
        })}
      </div>

      <QueueKitchenList items={card.kitchenItems} />

      <motion.button
        type="button"
        onClick={card.isBarDone ? card.handOver : card.finishBar}
        whileTap={{ scale: 0.98 }}
        transition={SPRING.snappy}
        className={cn(
          "mt-auto h-11 w-full rounded-card text-sm font-bold transition-colors",
          card.isBarDone
            ? "bg-brand text-white hover:bg-brand-soft"
            : "border border-border text-foreground hover:bg-muted",
        )}
      >
        {card.isBarDone ? "Serahkan" : `Tandai semua siap · ${card.barDone}/${card.barItems.length}`}
      </motion.button>
    </motion.article>
  );
}