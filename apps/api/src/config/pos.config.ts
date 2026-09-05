import { OrderStatus } from "@prisma/client";

export const POS_CONFIG = {
  tax: { rate: 0.1 },
  order: {
    numberPrefix: "A",
    businessDayStartHour: 4,
    revenueStatuses: [
      OrderStatus.PAID,
      OrderStatus.IN_PROGRESS,
      OrderStatus.READY,
      OrderStatus.DONE,
    ],
    cancellableStatuses: [
      OrderStatus.PENDING_PAYMENT,
      OrderStatus.PAID,
      OrderStatus.IN_PROGRESS,
      OrderStatus.READY,
    ],
  },
  queue: { recentLimit: 5 },
} as const;