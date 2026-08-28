export const ORDERS_CONFIG = {
  pageSize: 12,
} as const;

export const ORDER_STATUS_META = {
  PENDING_PAYMENT: { label: "Belum bayar", className: "bg-selected text-foreground" },
  PAID: { label: "Dibayar", className: "bg-muted text-foreground" },
  IN_PROGRESS: { label: "Dikerjakan", className: "bg-muted text-foreground" },
  READY: { label: "Siap", className: "bg-muted text-stock-ok" },
  DONE: { label: "Selesai", className: "bg-muted text-muted-foreground" },
  EXPIRED: { label: "Kedaluwarsa", className: "bg-danger-soft text-danger-soft-fg" },
  CANCELLED: { label: "Batal", className: "bg-danger-soft text-danger-soft-fg" },
} as const;

export const ORDER_SOURCE_META = {
  CASHIER: { label: "Kasir", className: "bg-muted text-muted-foreground" },
  QR: { label: "QR Meja", className: "bg-selected text-foreground" },
} as const;

export const ORDER_FILTERS = [
  { value: "ALL", label: "Semua" },
  { value: "PAID", label: "Dibayar" },
  { value: "DONE", label: "Selesai" },
] as const;