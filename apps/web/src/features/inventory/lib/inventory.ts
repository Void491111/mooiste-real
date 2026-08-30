import { INVENTORY_CONFIG } from "../config/inventory-config";
import type { InventoryRow } from "../types";

export type StockLevel = "out" | "low" | "ok";

export function stockLevelOf(row: InventoryRow): StockLevel {
  if (row.available <= 0) return "out";
  if (row.available <= INVENTORY_CONFIG.lowStockThreshold) return "low";
  return "ok";
}

export function groupByCategory(rows: InventoryRow[]) {
  const groups = new Map<string, InventoryRow[]>();

  for (const row of rows) {
    const bucket = groups.get(row.category) ?? [];
    bucket.push(row);
    groups.set(row.category, bucket);
  }

  return [...groups.entries()].map(function toGroup(entry) {
    return { category: entry[0], items: entry[1] };
  });
}