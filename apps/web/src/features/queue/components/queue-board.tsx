"use client";

import { AnimatePresence } from "motion/react";
import { QUEUE_CONFIG } from "@/config/queue.config";
import type { QueueOrder } from "../types";
import { QueueCard } from "./queue-card";

type Props = {
  orders: QueueOrder[];
  now: number;
  onHandedOver: () => void;
};

export function QueueBoard({ orders, now, onHandedOver }: Props) {
  return (
    <div
      className="grid flex-1 auto-rows-min content-start gap-3 overflow-y-auto pb-2"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${QUEUE_CONFIG.card.minWidth}px, ${QUEUE_CONFIG.card.maxWidth}px))`,
      }}
    >
      <AnimatePresence mode="popLayout">
        {orders.map(function renderCard(order) {
          return <QueueCard key={order.id} order={order} now={now} onHandedOver={onHandedOver} />;
        })}
      </AnimatePresence>
    </div>
  );
}