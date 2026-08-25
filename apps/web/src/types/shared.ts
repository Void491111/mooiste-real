export const ORDER_TYPES = [
  { value: "DINE_IN", label: "Dine In" },
  { value: "TAKEAWAY", label: "Takeaway" },
] as const;

export type OrderType = (typeof ORDER_TYPES)[number]["value"];

export function orderTypeLabel(value: OrderType) {
  return ORDER_TYPES.find((type) => type.value === value)?.label ?? value;
}