"use client";

import { useCallback, useEffect, useState } from "react";
import { REPORT_CONFIG } from "@/config/report.config";
import { daysAgoIso, todayIso } from "@/lib/date";
import { getReport } from "../api/report.api";
import { downloadCsv, toCsv } from "../lib/csv";
import type { Report } from "../types";

export function useReport() {
  const [from, setFrom] = useState(daysAgoIso(REPORT_CONFIG.defaultDays - 1));
  const [to, setTo] = useState(todayIso());
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async function loadReport() {
      setIsLoading(true);
      setError(null);

      try {
        setReport(await getReport(from, to));
      } catch (cause) {
        setReport(null);
        setError(cause instanceof Error ? cause.message : "Gagal memuat laporan");
      } finally {
        setIsLoading(false);
      }
    },
    [from, to],
  );

  useEffect(
    function reloadOnRange() {
      void load();
    },
    [load],
  );

  function downloadDaily() {
    if (report === null) return;

    const rows = report.daily.map(function toRow(day) {
      return [day.date, day.revenue, day.orders];
    });

    rows.push(["Total", report.totals.revenue, report.totals.orders])

    downloadCsv(
      `laporan-harian-${from}-sd-${to}.csv`,
      toCsv(["Tanggal", "Omzet", "Jumlah order"], rows),
    );
  }

  function downloadMenus() {
    if (report === null) return;

    const rows = report.menus.map(function toRow(menu) {
      return [menu.name, menu.category, menu.qty, menu.revenue];
    });

    const totalQty = report.menus.reduce(function sumQty(sum, menu) {
        return sum + menu.qty;
    }, 0);

    const totalRevenue = report.menus.reduce(function sumRevenue(sum, menu) {
        return sum + menu.revenue;
    }, 0);

    rows.push(["Total", "", totalQty, totalRevenue]);

    downloadCsv(
      `laporan-menu-${from}-sd-${to}.csv`,
      toCsv(["Menu", "Kategori", "Terjual", "Omzet"], rows),
    );
  }

  return {
    from,
    to,
    report,
    isLoading,
    error,
    setFrom,
    setTo,
    downloadDaily,
    downloadMenus,
  };
}