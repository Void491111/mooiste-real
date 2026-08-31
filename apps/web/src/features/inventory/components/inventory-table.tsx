"use client";

import { cn } from "@/lib/utils";
import { groupByCategory } from "../lib/inventory";
import type { InventoryRow as InventoryRowData } from "../types";
import { InventoryRow } from "./inventory-row";

type Props = {
  rows: InventoryRowData[];
  canEditStock: boolean;
  onUpdated: (row: InventoryRowData) => void;
};

const HEADERS = [
  { key: "menu", label: "Menu", className: "text-left" },
  { key: "available", label: "Stok", className: "pr-8 text-right" },
  { key: "action", label: "", className: "text-right" },
];

export function InventoryTable({ rows, canEditStock, onUpdated }: Props) {
  const groups = groupByCategory(rows);

  return (
    <div className="flex-1 overflow-auto rounded-card border border-border">
      <table className="w-full text-sm">
        <thead className="sticky top-0 z-10 bg-card">
          <tr className="border-b border-border text-xs text-muted-foreground">
            {HEADERS.map(function renderHeader(header) {
              return (
                <th
                  key={header.key}
                  className={cn("whitespace-nowrap px-4 py-3 font-medium", header.className)}
                >
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>

        {groups.map(function renderGroup(group) {
          return (
            <tbody key={group.category}>
              <tr className="bg-muted/50">
                <td
                  colSpan={HEADERS.length}
                  className="px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {group.category}
                </td>
              </tr>

              {group.items.map(function renderRow(row) {
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
          );
        })}
      </table>
    </div>
  );
}