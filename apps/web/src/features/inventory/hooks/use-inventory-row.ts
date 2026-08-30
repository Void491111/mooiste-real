"use client";

import { useState } from "react";
import { toast } from "sonner";
import { markSoldOut, setStock } from "../api/inventory.api";
import type { InventoryRow } from "../types";

export function useInventoryRow(row: InventoryRow, onUpdated: (row: InventoryRow) => void) {
  const [draft, setDraft] = useState(String(row.stock));
  const [isSaving, setIsSaving] = useState(false);

  async function save() {
    const next = Number(draft);

    if (!Number.isInteger(next) || next < 0) {
      setDraft(String(row.stock));
      toast.error("Stok harus angka bulat, minimal 0");
      return;
    }

    if (next === row.stock || isSaving) return;

    setIsSaving(true);

    try {
      const updated = await setStock(row.id, next);
      onUpdated(updated);
      toast.success(`Stok ${row.name} jadi ${next}`);
    } catch (caught) {
      setDraft(String(row.stock));
      toast.error(caught instanceof Error ? caught.message : "Gagal ubah stok");
    } finally {
      setIsSaving(false);
    }
  }

  async function soldOut() {
    if (isSaving || row.stock === 0) return;

    setIsSaving(true);

    try {
      const updated = await markSoldOut(row.id);
      setDraft("0");
      onUpdated(updated);
      toast.success(`${row.name} ditandai habis`);
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Gagal menandai habis");
    } finally {
      setIsSaving(false);
    }
  }

  return { draft, isSaving, setDraft, save, soldOut };
}