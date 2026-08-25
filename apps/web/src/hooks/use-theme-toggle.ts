"use client";

import { useEffect, useState } from "react";
import { THEME_TRANSITION_MS } from "@/config/motion.config";

const STORAGE_KEY = "mooiste-theme";
const TRANSITION_CLASS = "theme-transition";

export function useThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(function readCurrentTheme() {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !isDark;

    root.classList.add(TRANSITION_CLASS);
    root.classList.toggle("dark", next);
    setIsDark(next);

    window.setTimeout(function endTransition() {
      root.classList.remove(TRANSITION_CLASS);
    }, THEME_TRANSITION_MS);

    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch (error) {
      console.warn("Gagal simpan tema", error);
    }
  }

  return { mounted, isDark, toggle };
}