"use client";

import { useCallback, useEffect, useState } from "react";
import { getOrders } from "../api/orders.api";
import type { OrderFilter, OrderRow } from "../types";

export function useOrders() {
  const [filter, setFilter] = useState<OrderFilter>("ALL");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async function loadOrders() {
      setIsLoading(true);

      try {
        setError(null);
        const data = await getOrders(filter);
        setOrders(data);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Gagal memuat pesanan");
      } finally {
        setIsLoading(false);
      }
    },
    [filter],
  );

  useEffect(
    function loadOnFilterChange() {
      load();
    },
    [load],
  );

  return {
    orders,
    filter,
    isLoading,
    error,
    isEmpty: orders.length === 0,
    setFilter,
    refetch: load,
  };
}