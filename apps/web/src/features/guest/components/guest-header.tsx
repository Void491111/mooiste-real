import { GUEST_CONFIG } from "@/config/guest.config";

export function GuestHeader({ tableNumber }: { tableNumber: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-foreground">
            {GUEST_CONFIG.cafeName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {GUEST_CONFIG.tagline}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
          Meja {tableNumber}
        </span>
      </div>
    </header>
  );
}