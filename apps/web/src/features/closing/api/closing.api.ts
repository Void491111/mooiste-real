import { apiGet, apiPost, apiDelete } from "@/lib/api";
import type { ClosingSummary, ClosingHistoryRow } from "../types";

export function getClosingSummary() {
  return apiGet<ClosingSummary>("/closings/summary");
}

export function closeCash(body: { countedCash: number; note: string }) {
  return apiPost<ClosingSummary>("/closings", body);
}

export function reopenCash() {
  return apiDelete<ClosingSummary>("/closings");
}

export function fetchClosingHistory() {
  return apiGet<ClosingHistoryRow[]>("/closings/history");
}