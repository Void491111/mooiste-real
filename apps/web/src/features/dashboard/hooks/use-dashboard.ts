"use client";

import { useCallback, useEffect, useState } from "react";
import { DASHBOARD_CONFIG } from "@/config/dashboard.config";
import { getDashboardSummary } from "../api/dashboard.api";
import type { DashboardSummary } from "../types";

export function useDashboard() {
  const [days, setDays] = useState<number>(DASHBOARD_CONFIG.defaultDays);
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async function loadSummary() {
      setIsLoading(true);
      setError(null);

      try {
        setData(await getDashboardSummary(days));
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Gagal memuat dasbor");
      } finally {
        setIsLoading(false);
      }
    },
    [days],
  );

  useEffect(
    function reloadWhenRangeChanges() {
      void load();
    },
    [load],
  );

  return { days, setDays, data, isLoading, error, reload: load };
}