import { ORDER_STATUS_META } from "@/config/orders.config";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "../types";

type Props = {
  status: OrderStatus;
};

export function OrderStatusBadge({ status }: Props) {
  const meta = ORDER_STATUS_META[status];

  return (
    <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", meta.className)}>
      {meta.label}
    </span>
  );
}