export const QUEUE_CONFIG = {
  urgency: { warnMinutes: 5, lateMinutes: 10 },
  tick: { intervalMs: 15_000 },
  card: { minWidth: 260 },
} as const;

export const STATION_BY_CATEGORY = {
  COFFEE: "BAR",
  NON_COFFEE: "BAR",
  FOOD: "KITCHEN",
  SNACK: "KITCHEN",
} as const;

export const STATION_LABEL = {
  BAR: "Bar",
  KITCHEN: "Dapur",
} as const;