import { OrderStatus } from "@prisma/client";

export const POS_CONFIG = {
  tax: { rate: 0.1 },

  order: {
    numberPrefix: "A",
    businessDayStartHour: 4,

    /** Status yang berarti uangnya sudah masuk. Dipakai dasbor dan tutup kas. */
    revenueStatuses: [
      OrderStatus.PAID,
      OrderStatus.IN_PROGRESS,
      OrderStatus.READY,
      OrderStatus.DONE,
    ],
  },

  queue: { recentLimit: 5 },
} as const;