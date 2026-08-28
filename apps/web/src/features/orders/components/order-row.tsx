"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import { formatMoney, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { orderTypeLabel } from "@/types/shared";
import type { OrderRow as OrderRowData } from "../types";
import { OrderStatusBadge } from "./order-status-badge";

type Props = {
  order: OrderRowData;
};

export function OrderRow({ order }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(function flip(previous) {
      return !previous;
    });
  }

  return (
    <motion.li className="shrink-0 overflow-hidden rounded-card border border-border bg-card">
            <button
        type="button"
        onClick={toggleOpen}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted"
      >
        <span className="w-16 shrink-0 text-sm font-semibold text-foreground">{order.number}</span>
        <span className="w-12 shrink-0 text-xs text-muted-foreground">
          {formatTime(order.createdAt)}
        </span>

        {order.orderType === "TAKEAWAY" && (
          <span className="shrink-0 text-xs text-muted-foreground">Takeaway</span>
        )}

        {order.status !== "DONE" && <OrderStatusBadge status={order.status} />}

        <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-foreground">
          {formatMoney(order.total)}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING.snappy}
            className="overflow-hidden"
          >
            <div className="space-y-1 border-t border-border px-3 py-2.5">
              {order.items.map(function renderItem(item) {
                return (
                  <div key={item.id} className="flex items-baseline gap-2 text-sm">
                    <span className="tabular-nums text-muted-foreground">{item.qty}</span>
                    <span className="truncate text-foreground">{item.name}</span>
                    {item.note !== "" && (
                      <span className="truncate text-xs text-note">{item.note}</span>
                    )}
                    <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">
                      {formatMoney(item.price * item.qty)}
                    </span>
                  </div>
                );
              })}

              <div className="flex justify-between border-t border-border pt-1.5 text-xs text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatMoney(order.subtotal)}</span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Pajak</span>
                <span className="tabular-nums">{formatMoney(order.tax)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}