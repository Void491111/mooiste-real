"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { closeCash, getClosingSummary } from "../api/closing.api";
import type { ClosingSummary } from "../types";

export function useClosing() {
  const [summary, setSummary] = useState<ClosingSummary | null>(null);
  const [counted, setCounted] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async function loadSummary() {
    setIsLoading(true);
    setError(null);

    try {
      setSummary(await getClosingSummary());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Gagal memuat kas");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(
    function loadOnMount() {
      void load();
    },
    [load],
  );

  const countedNumber = Number(counted);

  const canSubmit =
    counted.trim().length > 0 &&
    Number.isFinite(countedNumber) &&
    countedNumber >= 0;

  // Selisih dihitung sambil diketik, jadi kasir lihat hasilnya
  // sebelum menekan tombol — bukan setelah tidak bisa dibatalkan.
  const difference =
    canSubmit && summary ? countedNumber - summary.expectedCash : null;

  async function submit() {
    if (!canSubmit) return;

    setIsSaving(true);
    setError(null);

    try {
      setSummary(await closeCash({ countedCash: countedNumber, note }));
      setCounted("");
      setNote("");
      toast.success("Kas hari ini ditutup");
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Gagal menutup kas";

      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  return {
    summary,
    counted,
    note,
    difference,
    canSubmit,
    isLoading,
    isSaving,
    error,
    setCounted,
    setNote,
    submit,
  };
}