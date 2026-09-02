"use client";

import type { ChangeEvent, FormEvent } from "react";
import { formatMoney } from "@/lib/format";

const FIELD_CLASS =
  "h-9 w-full rounded-card border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-selected-ring";

type Props = {
  counted: string;
  note: string;
  difference: number | null;
  canSubmit: boolean;
  isSaving: boolean;
  onCountedChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSubmit: () => void;
};

function DifferenceLine({ difference }: { difference: number | null }) {
  if (difference === null) return null;

  if (difference === 0) {
    return <p className="text-sm text-stock-ok">Pas, tidak ada selisih.</p>;
  }

  const isShort = difference < 0;

  return (
    <p className={`text-sm ${isShort ? "text-danger-soft" : "text-note"}`}>
      {isShort ? "Kurang" : "Lebih"} {formatMoney(Math.abs(difference))}
    </p>
  );
}

export function ClosingForm({
  counted,
  note,
  difference,
  canSubmit,
  isSaving,
  onCountedChange,
  onNoteChange,
  onSubmit,
}: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  function handleCounted(event: ChangeEvent<HTMLInputElement>) {
    onCountedChange(event.target.value);
  }

  function handleNote(event: ChangeEvent<HTMLInputElement>) {
    onNoteChange(event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-border bg-card p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-xs text-muted-foreground">
            Uang tunai di laci
          </span>
          <input
            className={FIELD_CLASS}
            type="number"
            min={0}
            value={counted}
            onChange={handleCounted}
            autoFocus
          />
        </label>

        <label>
          <span className="mb-1 block text-xs text-muted-foreground">
            Catatan (opsional)
          </span>
          <input
            className={FIELD_CLASS}
            value={note}
            onChange={handleNote}
            placeholder="mis. ada kembalian belum diambil"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <DifferenceLine difference={difference} />

        <button
          type="submit"
          disabled={!canSubmit || isSaving}
          className="h-9 shrink-0 rounded-card bg-brand px-4 text-sm text-white disabled:opacity-40"
        >
          {isSaving ? "Menutup…" : "Tutup kas"}
        </button>
      </div>
    </form>
  );
}