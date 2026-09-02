import { POS_CONFIG } from "../config/pos.config";
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

  timezone: "Asia/Jakarta",
  openHours: { from: 7, to: 21 },
} as const;