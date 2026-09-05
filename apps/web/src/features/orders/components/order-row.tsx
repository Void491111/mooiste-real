"use client";

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
  const status = ORDER_STATUS_META[order.status];
  const isDone = order.status === "DONE";
  const isCancelled = order.status === "CANCELLED";

  function askCancel() {
    onCancel(order);
  }

  return (
    <tr className="border-b border-border/60 align-top last:border-0 even:bg-muted/30">
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground">{order.number}</span>
          {order.source === "QR" ? (
            <span
              className="size-1.5 rounded-full bg-note"
              title="Pesan via QR"
            />
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground">
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
  );
}