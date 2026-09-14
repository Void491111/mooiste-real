"use client";

import type { ChangeEvent } from "react";

type Props = {
  from: string;
  to: string;
  canDownload: boolean;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onDownloadDaily: () => void;
  onDownloadMenus: () => void;
};

const FIELD =
  "h-9 rounded-card border border-border bg-card px-3 text-sm text-foreground";

const BUTTON =
  "h-9 rounded-card border border-border px-3 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40";

export function ReportRange({
  from,
  to,
  canDownload,
  onFromChange,
  onToChange,
  onDownloadDaily,
  onDownloadMenus,
}: Props) {
  function handleFrom(event: ChangeEvent<HTMLInputElement>) {
    onFromChange(event.target.value);
  }

  function handleTo(event: ChangeEvent<HTMLInputElement>) {
    onToChange(event.target.value);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input type="date" value={from} onChange={handleFrom} className={FIELD} />
      <span className="text-sm text-muted-foreground">sampai</span>
      <input type="date" value={to} onChange={handleTo} className={FIELD} />

      <div className="ml-auto flex gap-2">
        <button
          type="button"
          onClick={onDownloadDaily}
          disabled={!canDownload}
          className={BUTTON}
        >
          Unduh harian
        </button>
        <button
          type="button"
          onClick={onDownloadMenus}
          disabled={!canDownload}
          className={BUTTON}
        >
          Unduh menu
        </button>
      </div>
    </div>
  );
}