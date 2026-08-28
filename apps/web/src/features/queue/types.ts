import type { OrderType } from "@/types/shared";

export type Station = "BAR" | "KITCHEN";
export type Urgency = "normal" | "warn" | "late";

export type QueueItem = {
  id: string;
  name: string;
  qty: number;
  note: string;
  station: Station;
  isDone: boolean;
};

export type QueueOrder = {
  id: string;
  number: string;
  orderType: OrderType;
  createdAt: string;
  items: QueueItem[];
};