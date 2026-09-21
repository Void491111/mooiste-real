"use client";

import { useEffect, useState } from "react";
import type { GuestMenu } from "../types";

export function useItemSheet(menu: GuestMenu | null) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  useEffect(
    function resetOnOpen() {
      if (menu === null) return;

      setQty(1);
      setNote("");
    },
    [menu],
  );

  function increase() {
    setQty(function bump(current) {
      if (menu === null) return current;
      return Math.min(current + 1, menu.stock);
    });
  }

  function decrease() {
    setQty(function drop(current) {
      return Math.max(current - 1, 1);
    });
  }

  return { qty, note, setNote, increase, decrease };
}