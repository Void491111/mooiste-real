"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchClosingHistory } from "../api/closing.api";
import type { ClosingHistoryRow } from "../types";

export function useClosingHistory() {
  const [rows, setRows] = useState<ClosingHistoryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function loadHistory() {
    fetchClosingHistory()
      .then(function applyRows(data) {
        setRows(data);
      })
      .catch(function showError(error: unknown) {
        toast.error(
          error instanceof Error ? error.message : "Gagal memuat riwayat",
        );
      })
      .finally(function stopLoading() {
        setIsLoading(false);
      });
  }, []);

  return { rows, isLoading };
}