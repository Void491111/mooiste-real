"use client";

import { useCallback, useEffect, useState } from "react";
import { ORDERS_CONFIG } from "@/config/orders.config";
import { getOrders } from "../api/orders.api";
import { pageCount, paginate, todayIso } from "../lib/orders";
import type { OrderFilter, OrderRow } from "../types";

export function useOrders() {
  const [filter, setFilter] = useState<OrderFilter>("ALL");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState(todayIso);

    const load = useCallback(
    async function loadOrders() {
      setIsLoading(true);

      try {
        setError(null);
        const data = await getOrders(filter, date);
        setOrders(data);
        setPage(1);
      } catch (caught) {
        setError(
          caught instanceof Error ? caught.message : "Gagal memuat pesanan",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [filter, date],
  );

  useEffect(
    function loadOnFilterChange() {
      load();
    },
    [load],
  );

  const totalPages = pageCount(orders.length, ORDERS_CONFIG.pageSize);

  function goToPage(next: number) {
    setPage(Math.min(Math.max(next, 1), totalPages));
  }

  return {
    rows: paginate(orders, page, ORDERS_CONFIG.pageSize),
    total: orders.length,
    filter,
    page,
    totalPages,
    isLoading,
    error,
    isEmpty: orders.length === 0,
    setFilter,
    goToPage,
    refetch: load,
    date,
    setDate,
  };
}