"use client";

import { useSession } from "@/features/auth/hooks/use-session";
import { useOrderAlerts } from "../hooks/use-order-alerts";

export function OrderAlertsWatcher() {
  const { user } = useSession();

  useOrderAlerts(user?.role === "CASHIER");

  return null;
}