"use client";

import type { ChangeEvent, FormEvent } from "react";
import type { CategoryOption, MenuDraft } from "../types";

const FIELD_CLASS =
  "h-9 w-full rounded-[var(--radius-card)] border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-selected-ring";

const LABEL_CLASS = "mb-1 block text-xs text-muted-foreground";

type MenuFormProps = {
  draft: MenuDraft;
  categories: CategoryOption[];
  isEditing: boolean;
  isSaving: boolean;
  canSubmit: boolean;
  error: string | null;
  onFieldChange: (field: keyof MenuDraft, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function MenuForm({
  draft,
  categories,
  isEditing,
  isSaving,
  canSubmit,
  error,
  onFieldChange,
  onSubmit,
  onCancel,
}: MenuFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("name", event.target.value);
  }

  function handlePrice(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("price", event.target.value);
  }

  function handleStock(event: ChangeEvent<HTMLInputElement>) {
    onFieldChange("stock", event.target.value);
  }

  function handleCategory(event: ChangeEvent<HTMLSelectElement>) {
    onFieldChange("categoryId", event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-card)] border border-border bg-card p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="lg:col-span-2">
          <span className={LABEL_CLASS}>Nama menu</span>
          <input
            className={FIELD_CLASS}
            value={draft.name}
            onChange={handleName}
            autoFocus
          />
        </label>

        <label>
          <span className={LABEL_CLASS}>Harga</span>
          <input
            className={FIELD_CLASS}
            type="number"
            min={0}
            value={draft.price}
            onChange={handlePrice}
          />
        </label>

        <label>
          <span className={LABEL_CLASS}>Kategori</span>
          <select
            className={FIELD_CLASS}
            value={draft.categoryId}
            onChange={handleCategory}
          >
            <option value="">Pilih kategori</option>
            {categories.map(function toOption(item) {
              return (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </label>

        {!isEditing ? (
          <label>
            <span className={LABEL_CLASS}>Stok awal</span>
            <input
              className={FIELD_CLASS}
              type="number"
              min={0}
              value={draft.stock}
              onChange={handleStock}
            />
          </label>
        ) : null}
      </div>

      {error ? <p className="mt-3 text-xs text-danger-soft">{error}</p> : null}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 rounded-[var(--radius-card)] px-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={!canSubmit || isSaving}
          className="h-9 rounded-[var(--radius-card)] bg-brand px-4 text-sm text-white disabled:opacity-40"
        >
          {isSaving
            ? "Menyimpan…"
            : isEditing
              ? "Simpan perubahan"
              : "Tambah menu"}
        </button>
      </div>
    </form>
  );
}