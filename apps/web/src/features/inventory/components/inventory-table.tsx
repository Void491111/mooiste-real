"use client";

import { cn } from "@/lib/utils";
import { InventoryRow } from "./inventory-row";
import type { InventoryRow as InventoryRowData } from "../types";

type Props = {
  rows: InventoryRowData[];
  canEditStock: boolean;
  onUpdated: (row: InventoryRowData) => void;
};

const HEADERS = [
  { label: "Menu", className: "text-left" },
  { label: "Kategori", className: "text-left" },
  { label: "Stok", className: "text-right" },
  { label: "Dipesan", className: "text-right" },
  { label: "Tersedia", className: "pr-8 text-right" },
  { label: "", className: "text-right" },
];

export function InventoryTable({ rows, canEditStock, onUpdated }: Props) {
  return (
    <div className="flex-1 overflow-auto rounded-card border border-border">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-card">
          <tr className="border-b border-border text-xs text-muted-foreground">
            {HEADERS.map(function renderHeader(header, index) {
              return (
                <th
                  key={header.label === "" ? `spacer-${index}` : header.label}
                  className={cn("whitespace-nowrap px-4 py-3 font-medium", header.className)}
                >
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map(function renderRow(row) {
            return (
              <InventoryRow
                key={row.id}
                row={row}
                canEditStock={canEditStock}
                onUpdated={onUpdated}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}