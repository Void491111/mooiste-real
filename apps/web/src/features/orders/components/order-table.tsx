"use client";

import { cn } from "@/lib/utils";
import { OrderRow } from "./order-row";
import type { OrderRow as Order } from "../types";

type Props = {
  rows: Order[];
  onCancel: (order: Order) => void;
};

const HEADERS = [
  { label: "Pesanan", className: "text-left" },
  { label: "Menu", className: "text-left" },
  { label: "Total", className: "text-right" },
  { label: "Status", className: "text-left" },
  { label: "aksi", className: "text-right" },
];

export function OrderTable({ rows, onCancel }: Props) {
  return (
    <div className="flex-1 overflow-auto rounded-card border border-border">
      <table className="w-full table-fixed text-sm">
        <colgroup>
          <col className="w-36" />
          <col />
          <col className="w-32" />
          <col className="w-40" />
          <col className="w-24" />
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
                    header.label === "aksi" && "sr-only",
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
            return (
              <OrderRow key={order.id} order={order} onCancel={onCancel} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}