"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { SPRING } from "@/config/motion.config";
import { useThemeToggle } from "@/hooks/use-theme-toggle"; 

export function ThemeToggle() {
  const theme = useThemeToggle();

  return (
    <motion.button
      type="button"
      aria-label="Ganti tema"
      onClick={theme.toggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.9 }}
      transition={SPRING.snappy}
      className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-card bg-card shadow-sm"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme.mounted && (
          <motion.span
            key={theme.isDark ? "dark" : "light"}
            initial={{ y: 18, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -18, rotate: 90, opacity: 0 }}
            transition={SPRING.crisp}
            className="absolute"
          >
            {theme.isDark ? (
              <Sun className="size-4 text-foreground" />
            ) : (
              <Moon className="size-4 text-foreground" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}