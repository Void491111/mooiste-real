import { OrderSource, OrderType, PaymentMethod } from "@prisma/client";

export const SEED_ORDERS_CONFIG = {
  days: 60,
  ordersPerDay: 10,
  dailyVariance: 0.35,
  weekendMultiplier: 1.4,
  timezoneOffsetHours: 7,
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

  linesPerOrder: { min: 1, max: 3 },
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

  cancelledRate: 0.03,
  expiredRate: 0.02,
} as const;