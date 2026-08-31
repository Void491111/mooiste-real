export const DASHBOARD_CONFIG = {
    ranges: [
        { days: 7, label: "7 Hari" },
        { days: 30, label: "30 Hari" },
        { days: 90, label: "90 Hari" },
    ],

    defaultDays: 30,
    chartHeight: 260,
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Coffee: "var(--chart-1)",
  "Non Coffee": "var(--chart-3)",
  Food: "var(--chart-2)",
  Snack: "var(--chart-4)",
};
