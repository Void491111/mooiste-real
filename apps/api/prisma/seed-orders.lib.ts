import { OrderSource, OrderStatus } from "@prisma/client";
import { SEED_ORDERS_CONFIG } from "./seed-orders.config";

export type Weighted<T> = { readonly value: T; readonly weight: number };

export function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function pickWeighted<T>(options: readonly Weighted<T>[]): T {
  const total = options.reduce(function sumWeight(acc, option) {
    return acc + option.weight;
  }, 0);

  let ticket = Math.random() * total;

  for (const option of options) {
    ticket -= option.weight;
    if (ticket <= 0) return option.value;
  }

  return options[options.length - 1].value;
}

export function pickHour() {
  const options = SEED_ORDERS_CONFIG.hourWeights.map(function toWeighted(entry) {
    return { value: entry.hour, weight: entry.weight };
  });

  return pickWeighted(options);
}

export function pickSome<T>(source: readonly T[], count: number): T[] {
  const pool = [...source];
  const picked: T[] = [];

  while (picked.length < count && pool.length > 0) {
    const index = randomInt(0, pool.length - 1);
    picked.push(pool[index]);
    pool.splice(index, 1);
  }

  return picked;
}

export function isWeekend(date: Date) {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

export function orderCountFor(date: Date) {
  const { ordersPerDay, dailyVariance, weekendMultiplier } = SEED_ORDERS_CONFIG;

  const base = isWeekend(date) ? ordersPerDay * weekendMultiplier : ordersPerDay;
  const swing = base * dailyVariance;

  return Math.max(1, Math.round(base + (Math.random() * 2 - 1) * swing));
}

export function businessDateOf(daysAgo: number) {
  const now = new Date();
  const date = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date;
}

export function createdAtOn(businessDate: Date) {
  const stamp = new Date(businessDate);

  // Jam disimpan UTC, tapi bobotnya disusun pakai jam WIB.
  stamp.setUTCHours(
    pickHour() - SEED_ORDERS_CONFIG.timezoneOffsetHours,
    randomInt(0, 59),
    randomInt(0, 59),
    0,
  );

  return stamp;
}

export function pickStatus(source: OrderSource) {
  const { cancelledRate, expiredRate } = SEED_ORDERS_CONFIG;
  const roll = Math.random();

  if (roll < cancelledRate) return OrderStatus.CANCELLED;

  if (source === OrderSource.QR && roll < cancelledRate + expiredRate) {
    return OrderStatus.EXPIRED;
  }

  return OrderStatus.DONE;
}