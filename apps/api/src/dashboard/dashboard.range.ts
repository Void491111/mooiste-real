import { DASHBOARD_CONFIG } from "./dashboard.config";

export type DateRange = { from: Date; to: Date };

function todayUtc() {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

/**
 * Rentang sepanjang `days` hari, digeser mundur `offsetDays`.
 * offsetDays 0    -> periode berjalan
 * offsetDays days -> periode sebelumnya, buat pembanding
 */
export function rangeOf(days: number, offsetDays: number): DateRange {
  const to = todayUtc();
  to.setUTCDate(to.getUTCDate() - offsetDays);

  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - (days - 1));

  return { from, to };
}

export function toDateParam(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function clampDays(raw: unknown) {
  const { defaultDays, maxDays } = DASHBOARD_CONFIG;
  const parsed = Number(raw);

  if (!Number.isFinite(parsed) || parsed < 1) return defaultDays;
  return Math.min(Math.floor(parsed), maxDays);
}