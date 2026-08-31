import type { DailyPoint, HourlyPoint, PaymentSplit } from "../types";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/**
 * Persentase perubahan dari periode sebelumnya.
 * null kalau pembandingnya nol — "naik dari nol" bukan persentase
 * yang berarti, dan lebih jujur ditampilkan sebagai tanda hubung.
 */
export function growthOf(current: number, previous: number) {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

export function sumPayments(payments: PaymentSplit[]) {
  return payments.reduce(function addTotal(acc, item) {
    return acc + item.total;
  }, 0);
}

export function shareOf(value: number, total: number) {
  return total > 0 ? (value / total) * 100 : 0;
}

export function busiestHour(points: HourlyPoint[]) {
  if (points.length === 0) return null;

  return points.reduce(function keepBusier(best, point) {
    return point.orders > best.orders ? point : best;
  });
}

export function bestDay(daily: DailyPoint[]) {
  if (daily.length === 0) return null;

  return daily.reduce(function keepRicher(best, point) {
    return point.revenue > best.revenue ? point : best;
  });
}

/** "2026-08-31" -> "31 Agu" */
export function formatDayLabel(iso: string) {
  const parts = iso.split("-");
  const month = MONTHS[Number(parts[1]) - 1] ?? "";

  return `${Number(parts[2])} ${month}`;
}

/** 17 -> "17.00" */
export function formatHourLabel(hour: number) {
  return `${String(hour).padStart(2, "0")}.00`;
}

/** 1200000 -> "1,2jt". Buat sumbu Y, biar angkanya tidak menabrak. */
export function formatCompactMoney(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".", ",")}jt`;
  }

  if (value >= 1_000) return `${Math.round(value / 1_000)}rb`;

  return String(value);
}