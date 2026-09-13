"use client";

import { useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { formatMoney, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { summarizeItems } from "../lib/orders";
import type { OrderRow as Order } from "../types";
import { OrderRowItems } from "./order-row-items";
import { OrderStatusBadge } from "./order-status-badge";

type Props = {
  order: Order;
  onCancel: (order: Order) => void;
};

export function OrderRow({ order, onCancel }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isCancelled = order.status === "CANCELLED";

  function toggle() {
    setIsOpen(function flip(open) {
      return !open;
    });
  }

  function askCancel(event: MouseEvent) {
    event.stopPropagation();
    onCancel(order);
  }

  return (
    <>
      <tr
        onClick={toggle}
        className="cursor-pointer border-b border-border/60 align-top last:border-0 hover:bg-muted/40"
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-1.5">
            <ChevronDown
              className={cn(
                "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
            <span className="font-semibold text-foreground">{order.number}</span>
            {order.source === "QR" ? (
              <span className="size-1.5 rounded-full bg-note" title="Pesan via QR" />
            ) : null}
          </div>
          <p className="pl-5 text-xs text-muted-foreground">
            {formatTime(order.createdAt)}
          </p>
        </td>

        <td className="px-4 py-3">
          <p className="truncate text-foreground">{summarizeItems(order.items)}</p>
          <p className="text-xs text-muted-foreground">
            {order.orderType === "TAKEAWAY" ? "Takeaway" : "Dine in"}
          </p>
          {isCancelled && order.cancelReason ? (
            <p className="mt-1 text-xs text-danger-soft">
              Alasan: {order.cancelReason}
            </p>
          ) : null}
        </td>

        <td className="px-4 py-3 text-right tabular-nums">
          <span className={cn(isCancelled && "text-muted-foreground line-through")}>
            {formatMoney(order.total)}
          </span>
        </td>

        <td className="px-4 py-3">
          <OrderStatusBadge status={order.status} />
        </td>

        <td className="px-4 py-3 text-right">
          {isCancelled ? null : (
            <button
              type="button"
              onClick={askCancel}
              className="text-xs text-muted-foreground hover:text-danger-soft"
            >
              Batalkan
            </button>
          )}
        </td>
      </tr>

      {isOpen ? <OrderRowItems items={order.items} /> : null}
    </>
  );
}