import { Prisma } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";

export function startOfBusinessDay(now: Date) {
    const start = new Date(now);
    start.setHours(POS_CONFIG.order.businessDayStartHour, 0, 0, 0);

    if (now.getHours() < POS_CONFIG.order.businessDayStartHour) {
        start.setDate(start.getDate() - 1);
    }

    return start;
}

export async function nextOrderNumber(tx: Prisma.TransactionClient, now: Date) {
    const count = await tx.order.count({
        where: { createdAt: { gte: startOfBusinessDay(now) } },
    });

    return `${POS_CONFIG.order.numberPrefix}-${String(count + 1).padStart(3, "0")}`;
}