"use client";

import { useCallback, useEffect, useState } from "react";
import { getInventory } from "../api/inventory.api";
import type { InventoryRow } from "../types";

export function useInventory() {
  const [rows, setRows] = useState<InventoryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async function loadInventory() {
    try {
      setError(null);
      setRows(await getInventory());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gagal memuat stok");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(
    function loadOnMount() {
      load();
    },
    [load],
  );

  function replaceRow(row: InventoryRow) {
    setRows(function applyRow(current) {
      return current.map(function swapMatching(item) {
        return item.id === row.id ? row : item;
      });
    });
  }

  return {
    rows,
    isLoading,
    error,
    isEmpty: rows.length === 0,
    refetch: load,
    replaceRow,
  };
}