"use client";

import { AnimatePresence } from "motion/react";
import type { OrderRow as OrderRowData } from "../types";
import { OrderRow } from "./order-row";

type Props = {
  orders: OrderRowData[];
};

export function OrderList({ orders }: Props) {
  return (
    <ul className="flex flex-1 flex-col gap-1.5 overflow-y-auto pb-2">
      <AnimatePresence mode="popLayout">
        {orders.map(function renderOrder(order) {
          return <OrderRow key={order.id} order={order} />;
        })}
      </AnimatePresence>
    </ul>
  );
}