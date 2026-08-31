export const DASHBOARD_CONFIG = {
    ranges: [
        { days: 7, label: "7 Hari" },
        { days: 30, label: "30 Hari" },
        { days: 90, label: "90 Hari" },
    ],

    defaultDays: 30,
    chartHeight: 260,
} as const;