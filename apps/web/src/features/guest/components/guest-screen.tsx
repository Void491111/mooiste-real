"use client";

import { useEffect, useState } from "react";
import { useGuestHydration } from "../hooks/use-guest-hydration";
import { useGuestMenu } from "../hooks/use-guest-menu";
import { totalsOf } from "../lib/guest-cart";
import { useGuestCartStore } from "../store/guest-cart.store";
import type { GuestMenu } from "../types";
import { GuestCartBar } from "./guest-cart-bar";
import { GuestHeader } from "./guest-header";
import { GuestMenuList } from "./guest-menu-list";
import { GuestItemSheet } from "./guest-item-sheet";
import { GuestCartSheet } from "./guest-cart-sheet";

export function GuestScreen({ tableNumber }: { tableNumber: string }) {
  const isReady = useGuestHydration(tableNumber);
  const menu = useGuestMenu();
  const items = useGuestCartStore((state) => state.items);
  const [selected, setSelected] = useState<GuestMenu | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false)
  const add = useGuestCartStore((state) => state.add);
  const [isAlive, setIsAlive] = useState(false);

  useEffect(function proveJs() {
    setIsAlive(true)
  })
    

  const totals = totalsOf(items);

  function closeSheet() {
    setSelected(null);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-background">
      <GuestHeader tableNumber={tableNumber} />
    <main className="min-h-0 flex-1 overflow-y-auto">
      {menu.error !== null ? (
        <p className="px-4 py-8 text-center text-sm text-danger-soft">
          {menu.error}
        </p>
      ) : menu.isLoading ? (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
          Memuat menu… {isAlive ? "JS ON" : "JS OFF"}
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
    </main>

    <GuestItemSheet menu={selected} onClose={closeSheet} onAdd={add} />

    <GuestCartSheet 
        isOpen={isCartOpen}
        tableNumber={tableNumber}
        onClose={closeCart}
    />

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