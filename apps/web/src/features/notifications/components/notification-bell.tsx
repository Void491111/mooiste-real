"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { formatMoney, formatTime } from "@/lib/format";
import { useNotificationStore } from "../store/notifications.store";

export function NotificationBell() {
  const alerts = useNotificationStore((state) => state.alerts);
  const unread = useNotificationStore((state) => state.unread);
  const clear = useNotificationStore((state) => state.clear);
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(function flip(open) {
      return !open;
    });
    clear();
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={toggle}
        aria-label="Notifikasi pesanan"
        className="relative grid size-11 place-items-center rounded-card bg-card shadow-sm"
      >
        <Bell className="size-4 text-foreground" />
        {unread > 0 ? (
          <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-danger-soft text-[10px] font-medium text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-card border border-border bg-card p-2 shadow-lg">
          {alerts.length === 0 ? (
            <p className="px-2 py-3 text-xs text-muted-foreground">
              Belum ada pesanan masuk.
            </p>
          ) : (
            alerts.map(function renderAlert(alert) {
              return (
                <div
                  key={alert.id}
                  className="flex items-baseline justify-between gap-2 rounded-lg px-2 py-2 hover:bg-muted"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {alert.number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(alert.createdAt)} · sudah dibayar
                    </p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {formatMoney(alert.total)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}