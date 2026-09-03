"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/features/pos/components/confirm-dialog";
import { ClosingForm } from "@/features/closing/components/closing-form";
import { ClosingResult } from "@/features/closing/components/closing-result";
import { ClosingStats } from "@/features/closing/components/closing-stats";
import { useClosing } from "@/features/closing/hooks/use-closing";
import { useSession } from "@/features/auth/hooks/use-session";

export default function ClosingPage() {
  const closing = useClosing();
  const { user } = useSession();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const canReopen = user?.role === "ADMIN";

  function askReopen() {
    setIsConfirmOpen(true);
  }

  function cancelReopen() {
    setIsConfirmOpen(false);
  }

  function confirmReopen() {
    setIsConfirmOpen(false);
    void closing.reopen();
  }

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
            <ClosingResult
              record={closing.summary.closing}
              canReopen={canReopen}
              isReopening={closing.isReopening}
              onReopen={askReopen}
            />
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

      <ConfirmDialog
        open={isConfirmOpen}
        title="Buka kembali kas hari ini?"
        description="Catatan penutupan hari ini akan dihapus, dan kasir bisa menerima pesanan lagi. Setelah selesai, kasnya perlu ditutup ulang."
        confirmLabel="Ya, buka kembali"
        destructive
        onCancel={cancelReopen}
        onConfirm={confirmReopen}
      />
    </div>
  );
}