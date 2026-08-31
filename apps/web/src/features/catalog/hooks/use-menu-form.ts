"use client";

import { useState } from "react";
import { createMenu, updateMenu } from "../api/catalog.api";
import type { MenuDraft, MenuRow } from "../types";

const EMPTY_DRAFT: MenuDraft = {
  name: "",
  price: "",
  categoryId: "",
  stock: "0",
};

function draftOf(row: MenuRow): MenuDraft {
  return {
    name: row.name,
    price: String(row.price),
    categoryId: row.categoryId,
    stock: String(row.stock),
  };
}

export function useMenuForm(onSaved: (row: MenuRow) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<MenuRow | null>(null);
  const [draft, setDraft] = useState<MenuDraft>(EMPTY_DRAFT);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = Number(draft.price);

  const canSubmit =
    draft.name.trim().length > 0 &&
    draft.categoryId.length > 0 &&
    Number.isFinite(price) &&
    price >= 0;

  function openCreate() {
    setEditing(null);
    setDraft(EMPTY_DRAFT);
    setError(null);
    setIsOpen(true);
  }

  function openEdit(row: MenuRow) {
    setEditing(row);
    setDraft(draftOf(row));
    setError(null);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setError(null);
  }

  function setField(field: keyof MenuDraft, value: string) {
    setDraft(function patch(current) {
      return { ...current, [field]: value };
    });
  }

  async function submit() {
    if (!canSubmit) return;

    setIsSaving(true);
    setError(null);

    try {
      // Stok sengaja tidak ikut saat mengubah — itu urusan halaman Stok,
      // dan angkanya bisa berubah karena penjualan sambil form dibuka.
      const saved = editing
        ? await updateMenu(editing.id, {
            name: draft.name.trim(),
            price,
            categoryId: draft.categoryId,
          })
        : await createMenu({
            name: draft.name.trim(),
            price,
            categoryId: draft.categoryId,
            stock: Number(draft.stock) || 0,
          });

      onSaved(saved);
      setIsOpen(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Gagal menyimpan menu");
    } finally {
      setIsSaving(false);
    }
  }

  return {
    isOpen,
    editing,
    draft,
    isSaving,
    canSubmit,
    error,
    openCreate,
    openEdit,
    close,
    setField,
    submit,
  };
}