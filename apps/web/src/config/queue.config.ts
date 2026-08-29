export const QUEUE_CONFIG = {
  urgency: { warnMinutes: 5, lateMinutes: 10 },
  tick: { intervalMs: 15_000 },
  card: { minWidth: 260, maxWidth: 320 },
  requireKitchenConfirm: ["TAKEAWAY"],
} as const;

export const STATION_LABEL = {
  BAR: "Bar",
  KITCHEN: "Dapur",
} as const;