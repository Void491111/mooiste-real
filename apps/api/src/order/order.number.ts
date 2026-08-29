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
  const last = await tx.order.findFirst({
    where: { createdAt: { gte: startOfBusinessDay(now) } },
    orderBy: { number: "desc" },
    select: { number: true },
  });

  const lastSequence = last ? Number(last.number.split("-")[1]) : 0;
  const next = Number.isFinite(lastSequence) ? lastSequence + 1 : 1;

  return `${POS_CONFIG.order.numberPrefix}-${String(next).padStart(3, "0")}`;
}