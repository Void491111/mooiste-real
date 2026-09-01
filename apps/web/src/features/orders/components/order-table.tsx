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
  { label: "Pesanan", className: "text-left" },
  { label: "Menu", className: "text-left" },
  { label: "Total", className: "text-right" },
  { label: "Status", className: "text-left" },
];

export function OrderTable({ rows }: Props) {
  return (
    <div className="flex-1 overflow-auto rounded-card border border-border">
      <table className="w-full table-fixed text-sm">
        {/*
          Lebar dipatok supaya kolom tidak bergeser saat isinya berubah
          panjang — status "Siap" dan "Menunggu bayar" harus menempati
          ruang yang sama.
        */}
        <colgroup>
          <col className="w-36" />
          <col />
          <col className="w-36" />
          <col className="w-40" />
        </colgroup>

        <thead className="sticky top-0 bg-card">
          <tr className="border-b border-border text-xs text-muted-foreground">
            {HEADERS.map(function renderHeader(header) {
              return (
                <th
                  key={header.label}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 font-normal",
                    header.className,
                  )}
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
                className="border-b border-border/60 last:border-0 even:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground">
                      {order.number}
                    </span>
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
                  <p className="truncate text-foreground">
                    {summarizeItems(order.items)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.orderType === "TAKEAWAY" ? "Takeaway" : "Dine in"}
                  </p>
                </td>

                <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">
                  {formatMoney(order.total)}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex min-w-23 justify-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs",
                      isDone
                        ? "bg-muted text-muted-foreground"
                        : status.className,
                    )}
                  >
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}