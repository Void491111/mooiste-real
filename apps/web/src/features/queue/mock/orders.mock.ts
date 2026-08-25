import type { QueueOrderTemplate } from "../types";

export const QUEUE_MOCK: QueueOrderTemplate[] = [
  {
    id: "q1",
    number: "A-014",
    orderType: "TAKEAWAY",
    minutesAgo: 12,
    items: [
      { id: "q1i1", name: "Kopi Gula Aren", qty: 2, note: "less sugar", station: "BAR", isDone: false },
      { id: "q1i2", name: "Croissant", qty: 1, note: "", station: "KITCHEN", isDone: false },
    ],
  },
  {
    id: "q2",
    number: "A-015",
    orderType: "DINE_IN",
    minutesAgo: 6,
    items: [
      { id: "q2i1", name: "Cappuccino", qty: 1, note: "", station: "BAR", isDone: true },
      { id: "q2i2", name: "Matcha Latte", qty: 1, note: "no ice", station: "BAR", isDone: false },
    ],
  },
  {
    id: "q3",
    number: "A-016",
    orderType: "TAKEAWAY",
    minutesAgo: 2,
    items: [
      { id: "q3i1", name: "Es Teh Manis", qty: 3, note: "", station: "BAR", isDone: false },
      { id: "q3i2", name: "Kentang Goreng", qty: 1, note: "extra saus", station: "KITCHEN", isDone: false },
      { id: "q3i3", name: "Pisang Goreng", qty: 2, note: "", station: "KITCHEN", isDone: false },
    ],
  },
  {
    id: "q4",
    number: "A-017",
    orderType: "DINE_IN",
    minutesAgo: 1,
    items: [{ id: "q4i1", name: "Americano", qty: 1, note: "", station: "BAR", isDone: false }],
  },
];