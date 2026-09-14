export type ReportTotals = {
  revenue: number;
  orders: number;
  averageTicket: number;
  cancelled: number;
};

export type ReportDaily = {
  date: string;
  revenue: number;
  orders: number;
};

export type ReportMenu = {
  menuId: string;
  name: string;
  category: string;
  qty: number;
  revenue: number;
};

export type ReportPayment = {
  method: string;
  total: number;
  orders: number;
};

export type Report = {
  from: string;
  to: string;
  totals: ReportTotals;
  daily: ReportDaily[];
  menus: ReportMenu[];
  payments: ReportPayment[];
};