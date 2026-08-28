"use client";

import { motion } from "motion/react";
import { ORDER_FILTERS } from "@/config/orders.config";
import { SPRING } from "@/config/motion.config";
import { cn } from "@/lib/utils";
import { OrderList } from "@/features/orders/components/order-list";
import { useOrders } from "@/features/orders/hooks/use-orders";

export default function OrdersPage() {
  const page = useOrders();

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-3">
      <header className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold text-foreground">Pesanan Hari Ini</h1>
        <p className="text-sm text-muted-foreground">{page.orders.length} pesanan</p>
      </header>

      <div className="flex flex-wrap gap-1.5">
        {ORDER_FILTERS.map(function renderFilter(item) {
          const isActive = item.value === page.filter;

          return (
            <motion.button
              key={item.value}
              type="button"
              whileTap={{ scale: 0.93 }}
              transition={SPRING.crisp}
              onClick={function selectFilter() {
                page.setFilter(item.value);
              }}
              className={cn(
                "relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                isActive ? "text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="order-filter-active"
                  transition={SPRING.crisp}
                  className="absolute inset-0 rounded-full bg-brand"
                />
              )}
              <span className="relative">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      {page.error !== null ? (
        <div className="grid flex-1 place-items-center rounded-card border border-danger-soft text-sm text-muted-foreground">
          {page.error}
        </div>
      ) : page.isLoading ? (
        <div className="flex-1 rounded-card bg-muted/40" />
      ) : page.isEmpty ? (
        <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
          Belum ada pesanan hari ini
        </div>
      ) : (
        <OrderList orders={page.orders} />
      )}
    </main>
  );
}