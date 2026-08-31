import { apiGet } from "@/lib/api";
import type { DashboardSummary } from "../types";

export function getDashboardSummary(days: number) {
  return apiGet<DashboardSummary>(`/dashboard/summary?days=${days}`);
}