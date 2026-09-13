"use client";

import type { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onChange: (value: string) => void;
};

export function SearchInput({
  value,
  placeholder = "Cari…",
  className,
  inputClassName,
  onChange,
}: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn("rounded-card border-none pl-9", inputClassName)}
      />
    </div>
  );
}