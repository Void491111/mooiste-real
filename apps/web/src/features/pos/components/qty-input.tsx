"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type QtyInputProps = {
  qty: number;
  className?: string;
  onCommit: (qty: number) => void;
};

export function QtyInput({ qty, className, onCommit }: QtyInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(String(qty));

  useEffect(
    function syncWhenIdle() {
      if (!isEditing) setDraft(String(qty));
    },
    [qty, isEditing],
  );

  function startEdit() {
    setDraft(String(qty));
    setIsEditing(true);
  }

  function commit() {
    setIsEditing(false);

    const next = Number(draft);

    if (!Number.isInteger(next) || next < 0) {
      setDraft(String(qty));
      return;
    }

    onCommit(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
      return;
    }

    if (event.key === "Escape") {
      setDraft(String(qty));
      setIsEditing(false);
    }
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={startEdit}
        className={cn("text-center font-semibold tabular-nums", className)}
      >
        {qty}
      </button>
    );
  }

  return (
    <input
      autoFocus
      type="text"
      inputMode="numeric"
      value={draft}
      onChange={function handleChange(event) {
        setDraft(event.target.value);
      }}
      onFocus={function selectAll(event) {
        event.currentTarget.select();
      }}
      onBlur={commit}
      onKeyDown={handleKeyDown}
      className={cn(
        "rounded bg-background text-center font-semibold tabular-nums outline-none ring-1 ring-brand",
        className,
      )}
    />
  );
}