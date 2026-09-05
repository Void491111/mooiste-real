export type ClosingRecord = {
  expectedCash: number;
  countedCash: number;
  difference: number;
  note: string;
  closedBy: string;
  closedAt: string;
};

export type ClosingSummary = {
  businessDate: string;
  totalRevenue: number;
  orderCount: number;
  expectedCash: number;
  closing: ClosingRecord | null;
};

export type ClosingHistoryRow = {
  id: string;
  businessDate: string;
  totalRevenue: number;
  orderCount: number;
  expectedCash: number;
  countedCash: number;
  difference: number;
  closedBy: string;
  note: string | null;
};