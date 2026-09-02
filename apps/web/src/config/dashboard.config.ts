export const DASHBOARD_CONFIG = {
    ranges: [
        { days: 1, label: "1 Hari"},
        { days: 7, label: "7 Hari" },
        { days: 30, label: "30 Hari" },
        { days: 90, label: "90 Hari" },
    ],

    defaultDays: 30,
    chartHeight: 260,
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Coffee: "var(--viz-1)",
  "Non Coffee": "var(--viz-3)",
  Food: "var(--viz-2)",
  Snack: "var(--viz-4)",
};