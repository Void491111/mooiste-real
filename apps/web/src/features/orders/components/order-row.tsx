"use client";

import { useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { ORDER_STATUS_META } from "@/config/orders.config";
import { formatMoney, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { summarizeItems } from "../lib/orders";
import type { OrderRow as Order } from "../types";

type Props = {
  order: Order;
  onCancel: (order: Order) => void;
};

export function OrderRow({ order, onCancel }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const status = ORDER_STATUS_META[order.status];
  const isDone = order.status === "DONE";
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
              <span
                className="size-1.5 rounded-full bg-note"
                title="Pesan via QR"
              />
            ) : null}
          </div>
          <p className="pl-5 text-xs text-muted-foreground">
            {formatTime(order.createdAt)}
          </p>
        </td>

        <td className="px-4 py-3">
          <p className="truncate text-foreground">
            {summarizeItems(order.items)}
          </p>
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
          <span
            className={cn(isCancelled && "text-muted-foreground line-through")}
          >
            {formatMoney(order.total)}
          </span>
        </td>

        <td className="px-4 py-3">
          <span
            className={cn(
              "inline-flex min-w-23 justify-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs",
              isDone ? "bg-muted text-muted-foreground" : status.className,
            )}
          >
            {status.label}
          </span>
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

      {isOpen ? (
        <tr className="border-b border-border/60 bg-muted/20">
          <td colSpan={5} className="px-4 pb-3 pt-0">
            <ul className="ml-5 space-y-1">
              {order.items.map(function renderItem(item) {
                return (
                  <li
                    key={item.id}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-foreground">
                      <span className="tabular-nums text-muted-foreground">
                        {item.qty}×
                      </span>{" "}
                      {item.name}
                      {item.note ? (
                        <span className="ml-2 text-xs italic text-muted-foreground">
                          {item.note}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 tabular-nums text-muted-foreground">
                      {formatMoney(item.price * item.qty)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </td>
        </tr>
      ) : null}
    </>
  );
}