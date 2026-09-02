"use client";

import { ClosingForm } from "@/features/closing/components/closing-form";
import { ClosingResult } from "@/features/closing/components/closing-result";
import { ClosingStats } from "@/features/closing/components/closing-stats";
import { useClosing } from "@/features/closing/hooks/use-closing";

export default function ClosingPage() {
  const closing = useClosing();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5">
      <header>
        <h1 className="text-lg font-medium text-foreground">Tutup Kas</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Hitung uang di laci, lalu cocokkan dengan catatan penjualan.
        </p>
      </header>

      {closing.isLoading ? (
        <p className="text-sm text-muted-foreground">Memuat…</p>
      ) : closing.summary === null ? (
        <p className="text-sm text-danger-soft">{closing.error}</p>
      ) : (
        <>
          <ClosingStats summary={closing.summary} />

          {closing.summary.closing ? (
            <ClosingResult record={closing.summary.closing} />
          ) : (
            <ClosingForm
              counted={closing.counted}
              note={closing.note}
              difference={closing.difference}
              canSubmit={closing.canSubmit}
              isSaving={closing.isSaving}
              onCountedChange={closing.setCounted}
              onNoteChange={closing.setNote}
              onSubmit={closing.submit}
            />
          )}
        </>
      )}
    </div>
  );
}