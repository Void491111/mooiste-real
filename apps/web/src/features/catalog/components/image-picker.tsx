"use client";

import { useRef } from "react";
import type { ChangeEvent } from "react";
import { GHOST_BUTTON } from "../lib/form-styles";
import { MenuThumb } from "./menu-thumb";

type ImagePickerProps = {
  url: string;
  name: string;
  isUploading: boolean;
  onPick: (file: File) => void;
  onClear: () => void;
};

export function ImagePicker({
  url,
  name,
  isUploading,
  onPick,
  onClear,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) onPick(file);

    // Dikosongkan supaya memilih file yang sama dua kali tetap memicu
    // perubahan — kalau tidak, percobaan kedua tidak terjadi apa-apa.
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <MenuThumb src={url || null} name={name} size={64} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={openPicker}
            disabled={isUploading}
            className={GHOST_BUTTON}
          >
            {isUploading ? "Mengunggah…" : "Pilih gambar"}
          </button>

          {url ? (
            <button type="button" onClick={onClear} className={GHOST_BUTTON}>
              Hapus gambar
            </button>
          ) : null}
        </div>

        <p className="text-xs text-muted-foreground">
          JPG, PNG, atau WEBP. Maksimal 2MB.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}