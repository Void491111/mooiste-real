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


/** Tanggal hari ini menurut jam lokal, bentuk "2026-09-02". */
export function todayIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  return local.toISOString().slice(0, 10);
}

