"use client";

import { cn } from "@/lib/utils";
import { formatCategory } from "../lib/guest-format";
import type { GuestMenu } from "../types";
import { GuestMenuRow } from "./guest-menu-row";

type Props = {
  menus: GuestMenu[];
  categories: string[];
  category: string | null;
  onCategoryChange: (category: string | null) => void;
  onSelect: (menu: GuestMenu) => void;
};

const CHIP =
  "shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors whitespace-nowrap";

export function GuestMenuList({
  menus,
  categories,
  category,
  onCategoryChange,
  onSelect,
}: Props) {
  function selectAll() {
    onCategoryChange(null);
  }

  return (
    <>
      <div className="sticky top-[57px] z-10 flex gap-2 overflow-x-auto bg-background px-4 py-2 [scrollbar-width:none]">
        <button
          type="button"
          onClick={selectAll}
          className={cn(
            CHIP,
            category === null
              ? "bg-brand text-white"
              : "bg-muted text-muted-foreground",
          )}
        >
          Semua
        </button>

        {categories.map(function renderChip(code) {
          return (
            <button
              key={code}
              type="button"
              onClick={function selectCategory() {
                onCategoryChange(code);
              }}
              className={cn(
                CHIP,
                category === code
                  ? "bg-brand text-white"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {formatCategory(code)}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 px-2 pb-28">
        {menus.map(function renderRow(menu) {
          return (
            <GuestMenuRow key={menu.id} menu={menu} onSelect={onSelect} />
          );
        })}
      </div>
    </>
  );
}