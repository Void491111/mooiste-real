"use client";

import { useEffect, useState } from "react";
import { useGuestCartStore } from "../store/guest-cart.store";
export function useGuestHydration(tableNumber: string) {
  const [isReady, setIsReady] = useState(false);
  const openTable = useGuestCartStore((state) => state.openTable);

  useEffect(
    function hydrateOnce() {
      void useGuestCartStore.persist.rehydrate();
      openTable(tableNumber);
      setIsReady(true);
    },
    [tableNumber, openTable],
  );

  return isReady;
}