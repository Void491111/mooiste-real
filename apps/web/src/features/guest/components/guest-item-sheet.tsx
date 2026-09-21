"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { formatMoney } from "@/lib/format";
import { useItemSheet } from "../hooks/use-item-sheet";
import type { GuestMenu } from "../types";
import { GuestSheet } from "./guest-sheet";

type Props = {
  menu: GuestMenu | null;
  onClose: () => void;
  onAdd: (menu: GuestMenu, qty: number, note: string) => void;
};

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-border text-foreground disabled:opacity-30"
    >
      {children}
    </button>
  );
}

export function GuestItemSheet({ menu, onClose, onAdd }: Props) {
  const sheet = useItemSheet(menu);

  function handleAdd() {
    if (menu === null) return;

    onAdd(menu, sheet.qty, sheet.note.trim());
    onClose();
  }

  return (
    <GuestSheet isOpen={menu !== null} onClose={onClose}>
      {menu === null ? null : (
        <div className="px-4 pb-5">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-card bg-muted">
            {menu.image ? (
              <Image
                src={menu.image}
                alt={menu.name}
                fill
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-cover"
              />
            ) : (
              <span className="absolute inset-0 grid place-items-center text-3xl font-bold text-muted-foreground/40">
                {menu.name.slice(0, 2)}
              </span>
            )}
          </div>

          <h2 className="mt-4 text-lg font-bold text-foreground">{menu.name}</h2>
          <p className="mt-0.5 text-sm tabular-nums text-muted-foreground">
            {formatMoney(menu.price)}
          </p>

          <label className="mt-4 block">
            <span className="text-xs text-muted-foreground">
              Catatan (opsional)
            </span>
            <input
              value={sheet.note}
              onChange={function handleNote(event) {
                sheet.setNote(event.target.value);
              }}
              placeholder="Es dikit, gula setengah…"
              maxLength={120}
              className="mt-1 h-11 w-full rounded-card border border-border bg-background px-3 text-sm"
            />
          </label>

          <div className="mt-5 flex items-center justify-center gap-5">
            <StepButton
              label="Kurangi"
              disabled={sheet.qty <= 1}
              onClick={sheet.decrease}
            >
              <Minus className="size-4" />
            </StepButton>

            <span className="w-8 text-center text-lg font-bold tabular-nums">
              {sheet.qty}
            </span>

            <StepButton
              label="Tambah"
              disabled={sheet.qty >= menu.stock}
              onClick={sheet.increase}
            >
              <Plus className="size-4" />
            </StepButton>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-5 flex h-13 w-full items-center justify-between rounded-card bg-brand px-4 text-white"
          >
            <span className="text-sm font-semibold">Tambah ke pesanan</span>
            <span className="text-sm font-bold tabular-nums">
              {formatMoney(menu.price * sheet.qty)}
            </span>
          </button>
        </div>
      )}
    </GuestSheet>
  );
}