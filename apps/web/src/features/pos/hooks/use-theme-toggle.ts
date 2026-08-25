"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mooiste-theme";

export function useThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(function readCurrentTheme() {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;

    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);

    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch (error) {
      console.warn("Gagal simpan tema", error);
    }
  }

  return { mounted, isDark, toggle };
}