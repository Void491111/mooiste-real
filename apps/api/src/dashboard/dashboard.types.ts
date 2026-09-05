export type PeriodTotals = {
    revenue: number;
    orders: number;
    averageTicket: number;
    cancelled: number;
};

export type DailyPoint = {
    date: string;
    revenue: number;
    orders: number;
};

export type HourlyPoint = {
    hour: number;
    orders: number;
};

export type menuRank = {
    menuId: string;
    name: string;
    qty: number;
    revenue: number;
};

export type PaymentSplit = {
    method: string;
    total: number;
    orders: number;
}

export type DashboardSummary = {
    days: number;
    current: PeriodTotals;
    previous: PeriodTotals;
    daily: DailyPoint[];
    hourly: HourlyPoint[];
    menus: menuRank[];
    payments: PaymentSplit[];
};