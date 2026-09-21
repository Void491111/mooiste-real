"use client";

import { useState } from "react";
import { useGuestHydration } from "../hooks/use-guest-hydration";
import { useGuestMenu } from "../hooks/use-guest-menu";
import { totalsOf } from "../lib/guest-cart";
import { useGuestCartStore } from "../store/guest-cart.store";
import type { GuestMenu } from "../types";
import { GuestCartBar } from "./guest-cart-bar";
import { GuestHeader } from "./guest-header";
import { GuestMenuList } from "./guest-menu-list";
import { GuestItemSheet } from "./guest-item-sheet";

export function GuestScreen({ tableNumber }: { tableNumber: string }) {
  const isReady = useGuestHydration(tableNumber);
  const menu = useGuestMenu();
  const items = useGuestCartStore((state) => state.items);
  const [selected, setSelected] = useState<GuestMenu | null>(null);
  const add = useGuestCartStore((state) => state.add);
    

  const totals = totalsOf(items);

  function closeSheet() {
    setSelected(null);
  }

  function openCart() {
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
      <GuestHeader tableNumber={tableNumber} />

      {menu.error !== null ? (
        <p className="px-4 py-8 text-center text-sm text-danger-soft">
          {menu.error}
        </p>
      ) : menu.isLoading ? (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
          Memuat menu…
        </p>
      ) : (
        <GuestMenuList
          menus={menu.menus}
          categories={menu.categories}
          category={menu.category}
          onCategoryChange={menu.setCategory}
          onSelect={setSelected}
        />
      )}

    <GuestItemSheet menu={selected} onClose={closeSheet} onAdd={add} />

      {isReady ? (
        <GuestCartBar
          count={totals.count}
          total={totals.total}
          onOpen={openCart}
        />
      ) : null}
    </div>
  );
}