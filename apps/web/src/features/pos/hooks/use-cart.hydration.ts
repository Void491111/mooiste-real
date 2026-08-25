"use client";

import { useEffect } from "react";
import { useCartStore } from "../store/cart.store";

export function useCartHydration() {
  useEffect(function rehydrateCart() {
    useCartStore.persist.rehydrate();
  }, []);
}