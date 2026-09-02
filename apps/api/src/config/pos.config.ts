import { OrderStatus } from "@prisma/client";

export const POS_CONFIG = {
    tax: {rate: 0.1}, 
    order: { numberPrefix: "A", businessDayStartHour: 4 },
    queue: { recentLimit: 5 },
} as const;

