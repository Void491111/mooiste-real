"use client";

import Image from "next/image";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { GuestMenu } from "../types";

type Props = {
  menu: GuestMenu;
  onSelect: (menu: GuestMenu) => void;
};

export function GuestMenuRow({ menu, onSelect }: Props) {
  const isOut = menu.stock <= 0;

  function handleClick() {
    if (isOut) return;
    onSelect(menu);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isOut}
      className={cn(
        "flex w-full items-center gap-3 rounded-card p-2 text-left transition-colors",
        isOut ? "opacity-45" : "active:bg-muted",
      )}
    >
      <div className="relative size-18 shrink-0 overflow-hidden rounded-card bg-muted">
        {menu.image ? (
          <Image
            src={menu.image}
            alt={menu.name}
            fill
            sizes="72px"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-lg font-bold text-muted-foreground/40">
            {menu.name.slice(0, 2)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {menu.name}
        </p>
        <p className="mt-0.5 text-sm tabular-nums text-muted-foreground">
          {formatMoney(menu.price)}
        </p>
        {isOut ? (
          <p className="mt-0.5 text-xs font-medium text-danger-soft">Habis</p>
        ) : null}
      </div>
    </button>
  );
}