import { OrderSource, OrderType, PaymentMethod } from "@prisma/client";

/**
 * Semua angka data palsu ada di sini.
 * Mau datanya beda? Ubah file ini, jangan skripnya.
 */
export const SEED_ORDERS_CONFIG = {
  /** Berapa hari ke belakang data disebar. */
  days: 180,

  /** Rata-rata order per hari. Angka harian diacak di sekitar ini. */
  ordersPerDay: 10,

  /** Variasi harian, dalam pecahan dari ordersPerDay. 0.35 = ±35%. */
  dailyVariance: 0.35,

  /** Sabtu & Minggu dikali segini. */
  weekendMultiplier: 1.4,

  /** Selisih WIB dari UTC. Dipakai biar jam ramai jatuh di jam yang benar. */
  timezoneOffsetHours: 7,

  /** Bobot tiap jam buka (WIB). Makin besar makin ramai. */
  hourWeights: [
    { hour: 7, weight: 3 },
    { hour: 8, weight: 8 },
    { hour: 9, weight: 9 },
    { hour: 10, weight: 6 },
    { hour: 11, weight: 4 },
    { hour: 12, weight: 5 },
    { hour: 13, weight: 4 },
    { hour: 14, weight: 3 },
    { hour: 15, weight: 4 },
    { hour: 16, weight: 7 },
    { hour: 17, weight: 9 },
    { hour: 18, weight: 8 },
    { hour: 19, weight: 6 },
    { hour: 20, weight: 4 },
    { hour: 21, weight: 2 },
  ],

  /** Berapa jenis menu dalam satu order. */
  linesPerOrder: { min: 1, max: 3 },

  /** Berapa porsi per jenis menu. */
  qtyPerLine: { min: 1, max: 2 },

  typeWeights: [
    { value: OrderType.DINE_IN, weight: 6 },
    { value: OrderType.TAKEAWAY, weight: 4 },
  ],

  sourceWeights: [
    { value: OrderSource.CASHIER, weight: 75 },
    { value: OrderSource.QR, weight: 25 },
  ],

  paymentWeights: [
    { value: PaymentMethod.CASH, weight: 45 },
    { value: PaymentMethod.QRIS, weight: 55 },
  ],

  /** Pecahan order yang batal. Bikin angka dasbor ga terlalu mulus. */
  cancelledRate: 0.03,

  /** Pecahan order QR yang kedaluwarsa sebelum dibayar. */
  expiredRate: 0.02,
} as const;