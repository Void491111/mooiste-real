"use client";

import { useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { CategoryOption, MenuDraft } from "../types";
import { MenuThumb } from "./menu-thumb";

const FIELD_CLASS =
  "h-9 w-full rounded-[var(--radius-card)] border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-selected-ring";

const LABEL_CLASS = "mb-1 block text-xs text-muted-foreground";

const GHOST_BUTTON =
  "h-8 rounded-[var(--radius-card)] border border-border px-3 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) onPickImage(file);

    // Dikosongkan supaya memilih file yang sama dua kali tetap memicu
    // perubahan — kalau tidak, percobaan kedua tidak terjadi apa-apa.
    event.target.value = "";
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
      <div className="mb-4 flex items-center gap-4">
        <MenuThumb src={draft.image || null} name={draft.name} size={64} />

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={openFilePicker}
              disabled={isUploading}
              className={GHOST_BUTTON}
            >
              {isUploading ? "Mengunggah…" : "Pilih gambar"}
            </button>

            {draft.image ? (
              <button
                type="button"
                onClick={onClearImage}
                className={GHOST_BUTTON}
              >
                Hapus gambar
              </button>
            ) : null}
          </div>

          <p className="text-xs text-muted-foreground">
            JPG, PNG, atau WEBP. Maksimal 2MB.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

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
          disabled={!canSubmit || isSaving || isUploading}
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