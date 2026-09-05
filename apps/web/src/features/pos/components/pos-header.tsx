"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/features/notifications/components/notification-bell";

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
      <NotificationBell />
    </header>
  );
}