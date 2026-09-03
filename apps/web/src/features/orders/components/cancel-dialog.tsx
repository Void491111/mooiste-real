"use client";

import type { ChangeEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { OrderRow } from "../types";

type Props = {
  order: OrderRow | null;
  reason: string;
  canSubmit: boolean;
  isSaving: boolean;
  onReasonChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export function CancelDialog({
  order,
  reason,
  canSubmit,
  isSaving,
  onReasonChange,
  onCancel,
  onConfirm,
}: Props) {
  function handleOpenChange(next: boolean) {
    if (!next) onCancel();
  }

  function handleReason(event: ChangeEvent<HTMLInputElement>) {
    onReasonChange(event.target.value);
  }

  return (
    <AlertDialog open={order !== null} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="rounded-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Batalkan pesanan {order?.number}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Stok akan dikembalikan, dan pembatalan ini tercatat atas nama kamu.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <input
          value={reason}
          onChange={handleReason}
          placeholder="Alasan pembatalan"
          autoFocus
          className="h-9 w-full rounded-card border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-selected-ring"
        />

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-card">Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={!canSubmit || isSaving}
            onClick={onConfirm}
            className="rounded-card bg-danger-soft text-foreground hover:bg-danger-soft/80"
          >
            {isSaving ? "Membatalkan…" : "Ya, batalkan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}