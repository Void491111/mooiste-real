import { OrderStatus } from "@prisma/client";

export const DASHBOARD_CONFIG = {
    defaultDays: 30,
    maxDays: 365,

    revenueStatuses: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.READY,
        OrderStatus.DONE,
    ],

    menuRankLimit: 5,
    timezone: "Asia/Jakarta",
    openHours: { from: 7, to: 21 },
} as const;

/**
 * Warna dipatok ke nama kategori, bukan ke urutannya.
 * Kalau dipatok ke urutan, kategori bisa ganti warna tiap kali
 * penjualan berubah — pembaca jadi hilang pegangan.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  Coffee: "var(--viz-1)",
  "Non Coffee": "var(--viz-3)",
  Food: "var(--viz-2)",
  Snack: "var(--viz-4)",
};