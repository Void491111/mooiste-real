import { create } from "zustand";
import { NOTIFICATION_CONFIG } from "@/config/notifications.config";

export type OrderAlert = {
  id: string;
  number: string;
  total: number;
  createdAt: string;
};

type NotificationState = {
  alerts: OrderAlert[];
  seenIds: string[];
  isReady: boolean;
  unread: number;
  markReady: (ids: string[]) => void;
  push: (incoming: OrderAlert[]) => void;
  clear: () => void;
};

export const useNotificationStore = create<NotificationState>(
  function createNotificationStore(set) {
    return {
      alerts: [],
      seenIds: [],
      isReady: false,
      unread: 0,

      markReady: function markReady(ids) {
        set({ seenIds: ids, isReady: true });
      },

      push: function pushAlerts(incoming) {
        set(function merge(state) {
          const ids = incoming.map(function idOf(alert) {
            return alert.id;
          });

          return {
            alerts: [...incoming, ...state.alerts].slice(
              0,
              NOTIFICATION_CONFIG.maxItems,
            ),
            seenIds: [...state.seenIds, ...ids],
            unread: state.unread + incoming.length,
          };
        });
      },

      clear: function clearUnread() {
        set({ unread: 0 });
      },
    };
  },
);