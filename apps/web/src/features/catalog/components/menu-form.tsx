"use client";

import type { ChangeEvent, FormEvent } from "react";
import { FIELD_CLASS, LABEL_CLASS } from "../lib/form-styles";
import type { CategoryOption, MenuDraft } from "../types";
import { ImagePicker } from "./image-picker";

type MenuFormProps = {
  draft: MenuDraft;
  categories: CategoryOption[];
  isEditing: boolean;
  isSaving: boolean;
  isUploading: boolean;
  canSubmit: boolean;
  error: string | null;
  onFieldChange: (field: keyof MenuDraft, value: string) => void;
  onPickImage: (file: File) => void;
  onClearImage: () => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function MenuForm({
  draft,
  categories,
  isEditing,
  isSaving,
  isUploading,
  canSubmit,
  error,
  onFieldChange,
  onPickImage,
  onClearImage,
  onSubmit,
  onCancel,
}: MenuFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    onFieldChange(event.target.name as keyof MenuDraft, event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-border bg-card p-5"
    >
      <div className="mb-4">
        <ImagePicker
          url={draft.image}
          name={draft.name}
          isUploading={isUploading}
          onPick={onPickImage}
          onClear={onClearImage}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="lg:col-span-2">
          <span className={LABEL_CLASS}>Nama menu</span>
          <input
            name="name"
            className={FIELD_CLASS}
            value={draft.name}
            onChange={handleChange}
            autoFocus
          />
        </label>

        <label>
          <span className={LABEL_CLASS}>Harga</span>
          <input
            name="price"
            type="number"
            min={0}
            className={FIELD_CLASS}
            value={draft.price}
            onChange={handleChange}
          />
        </label>

        <label>
          <span className={LABEL_CLASS}>Kategori</span>
          <select
            name="categoryId"
            className={FIELD_CLASS}
            value={draft.categoryId}
            onChange={handleChange}
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
              name="stock"
              type="number"
              min={0}
              className={FIELD_CLASS}
              value={draft.stock}
              onChange={handleChange}
            />
          </label>
        ) : null}
      </div>

      {error ? <p className="mt-3 text-xs text-danger-soft">{error}</p> : null}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 rounded-card px-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={!canSubmit || isSaving || isUploading}
          className="h-9 rounded-card bg-brand px-4 text-sm text-white disabled:opacity-40"
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