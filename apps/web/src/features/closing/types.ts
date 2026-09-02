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