"use client";

import { motion } from "motion/react";
import { Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle"; 
import { ICON_MOTION, SPRING } from "@/config/motion.config";

const ACTIONS = [
  { key: "settings", icon: Settings, label: "Pengaturan", motion: "spin" },
  { key: "profile", icon: User, label: "Profil", motion: "bounce" },
] as const;

type Props = {
  keyword: string;
  onKeywordChange: (value: string) => void;
};

export function PosHeader({ keyword, onKeywordChange }: Props) {
  return (
    <header className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
        <Input
          value={keyword}
          onChange={function handleSearch(event) {
            onKeywordChange(event.target.value);
          }}
          placeholder="Cari menu…"
          className="h-11 rounded-card border-none bg-card pl-9 shadow-sm"
        />
      </div>

      <ThemeToggle />

      {ACTIONS.map(function renderAction(action) {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.key}
            type="button"
            aria-label={action.label}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING.snappy}
            className="grid size-11 shrink-0 place-items-center rounded-card bg-card shadow-sm"
          >
            <motion.span whileHover={ICON_MOTION[action.motion]}>
              <Icon className="size-4 text-foreground" />
            </motion.span>
          </motion.button>
        );
      })}
    </header>
  );
}