"use client";

import { ORDER_STATUS_META } from "@/config/orders.config";
import { formatMoney, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { summarizeItems } from "../lib/orders";
import type { OrderRow } from "../types";

type Props = {
  rows: OrderRow[];
};

const HEADERS = [
  { label: "Nomor", className: "text-left" },
  { label: "Waktu", className: "text-left" },
  { label: "Menu", className: "text-left" },
  { label: "Total", className: "pr-10 text-right" },
  { label: "Status", className: "text-left" },
];

export function OrderTable({ rows }: Props) {
  return (
    <div className="flex-1 overflow-auto rounded-card border border-border">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-card">
          <tr className="border-b border-border text-xs text-muted-foreground">
            {HEADERS.map(function renderHeader(header) {
              return (
                <th
                  key={header.label}
                  className={cn("whitespace-nowrap px-4 py-3 font-medium", header.className)}
                >
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map(function renderRow(order) {
            const status = ORDER_STATUS_META[order.status];
            const isDone = order.status === "DONE";

            return (
              <tr
                key={order.id}
                className="border-b border-border transition-colors last:border-0 hover:bg-muted"
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground">{order.number}</span>
                    {order.source === "QR" && (
                      <span className="size-1.5 rounded-full bg-note" title="Pesan via QR" />
                    )}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {formatTime(order.createdAt)}
                </td>

                <td className="max-w-[320px] px-4 py-3">
                  <span className="block truncate text-foreground">
                    {summarizeItems(order.items)}
                  </span>
                  {order.orderType === "TAKEAWAY" && (
                    <span className="text-xs text-muted-foreground">Takeaway</span>
                  )}
                </td>

                <td className="whitespace-nowrap px-4 py-3 pr-10 text-right font-semibold tabular-nums text-foreground">
                  {formatMoney(order.total)}
                </td>

                <td className="px-4 py-3">
                  {isDone ? (
                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {status.label}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "whitespace-nowrap rounded-full px-2 py-0.5 text-xs",
                        status.className,
                      )}
                    >
                      {status.label}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}