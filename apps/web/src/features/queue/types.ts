import type { STATION_BY_CATEGORY } from "@/config/queue.config";
import type { OrderType } from "@/types/shared";

export type Station = (typeof STATION_BY_CATEGORY)[keyof typeof STATION_BY_CATEGORY];
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

export type QueueOrderTemplate = Omit<QueueOrder, "createdAt"> & {
  minutesAgo: number;
};
