import { ORDER_STATUS_META } from "@/config/orders.config";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "../types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const meta = ORDER_STATUS_META[status];

    return (
        <span
            className={cn(
                "inline-flex min-w-23 justify-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs", status === "DONE" ? "bg-muted-foreground" : meta.className,
            )}
        >
            {meta.label}
        </span>
    )
}