"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { NOTIFICATION_CONFIG } from "@/config/notifications.config";
import { todayIso } from "@/lib/date";
import { getPaidOrders, type PaidOrder } from "../api/alerts.api";
import { playChime, unlockChime } from "../lib/chime";
import { useNotificationStore } from "../store/notifications.store";

function isSelfOrder(order: PaidOrder) {
  return order.source === "QR";
}

export function useOrderAlerts(isEnabled: boolean) {
  const isReady = useNotificationStore((state) => state.isReady);
  const seenIds = useNotificationStore((state) => state.seenIds);
  const markReady = useNotificationStore((state) => state.markReady);
  const push = useNotificationStore((state) => state.push);

  const latest = useRef({ isReady, seenIds });
  latest.current = { isReady, seenIds };

  useEffect(
    function startPolling() {
        if (!isEnabled) return;
      let isActive = true;

      async function check() {
        try {
          const orders = await getPaidOrders(todayIso());

          if (!isActive) return;

          const selfOrders = orders.filter(isSelfOrder);
          const { isReady: ready, seenIds: seen } = latest.current;

          if (!ready) {
            markReady(
              selfOrders.map(function idOf(order) {
                return order.id;
              }),
            );
            return;
          }

          const fresh = selfOrders.filter(function isNew(order) {
            return !seen.includes(order.id);
          });

          if (fresh.length === 0) return;

          push(
            fresh.map(function toAlert(order) {
              return {
                id: order.id,
                number: order.number,
                total: order.total,
                createdAt: order.createdAt,
              };
            }),
          );

          playChime();
          toast.success(
            fresh.length === 1
              ? `Pesanan ${fresh[0].number} sudah dibayar`
              : `${fresh.length} pesanan baru sudah dibayar`,
          );
        } catch {
          // Koneksi putus sesaat bukan alasan buat nyembur error ke kasir.
        }
      }

      window.addEventListener("pointerdown", unlockChime, { once: true });
      void check();

      const timer = window.setInterval(check, NOTIFICATION_CONFIG.pollMs);

      return function stopPolling() {
        isActive = false;
        window.clearInterval(timer);
        window.removeEventListener("pointerdown", unlockChime);
      };
    },
    [markReady, push, isEnabled],
  );
}