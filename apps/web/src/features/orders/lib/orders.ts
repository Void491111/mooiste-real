import type { OrderItemRow } from "../types";

export function summarizeItems(items: OrderItemRow[]) {
  return items
    .map(function toLabel(item) {
      return `${item.name} ×${item.qty}`;
    })
    .join(", ");
}

export function pageCount(total: number, pageSize: number) {
  return Math.max(Math.ceil(total / pageSize), 1);
}

export function paginate<T>(rows: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}