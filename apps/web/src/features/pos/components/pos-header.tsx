"use client";

import { motion } from "motion/react";
import { Moon, Search, Settings, User } from "lucide-react";
import { ICON_HOVER } from "@/config/motion.config";
import { Input } from "@/components/ui/input";

const ACTIONS = [
  { key: "theme", icon: Moon, label: "Tema" },
  { key: "settings", icon: Settings, label: "Pengaturan" },
  { key: "profile", icon: User, label: "Profil" },
] as const;

type Props = {
  keyword: string;
  onKeywordChange: (value: string) => void;
};

export function PosHeader({ keyword, onKeywordChange }: Props) {
  return (
    <header className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          value={keyword}
          onChange={function handleSearch(event) {
            onKeywordChange(event.target.value);
          }}
          placeholder="Cari menu…"
          className="h-11 rounded-xl border-none bg-white pl-9 shadow-sm"
        />
      </div>

      {ACTIONS.map(function renderAction(action) {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.key}
            type="button"
            aria-label={action.label}
            {...ICON_HOVER}
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm"
          >
            <Icon className="size-4 text-neutral-700" />
          </motion.button>
        );
      })}
    </header>
  );
}