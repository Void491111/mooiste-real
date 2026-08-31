export type PeriodTotals = {
  revenue: number;
  orders: number;
  averageTicket: number;
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

export type MenuRank = {
  menuId: string;
  name: string;
  qty: number;
  revenue: number;
};

export type PaymentSplit = {
  method: string;
  total: number;
  orders: number;
};

export type DashboardSummary = {
  days: number;
  current: PeriodTotals;
  previous: PeriodTotals;
  daily: DailyPoint[];
  hourly: HourlyPoint[];
  topMenus: MenuRank[];
  slowMenus: MenuRank[];
  payments: PaymentSplit[];
};

/** 1200000 -> "1,2jt". Buat sumbu Y, biar angkanya tidak menabrak. */
export function formatCompactMoney(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".", ",")}jt`;
  }

  if (value >= 1_000) return `${Math.round(value / 1_000)}rb`;

  return String(value);
}