import { apiGet, apiPost } from "@/lib/api";
import type { ClosingSummary } from "../types";

export function getClosingSummary() {
  return apiGet<ClosingSummary>("/closings/summary");
}

export function closeCash(body: { countedCash: number; note: string }) {
  return apiPost<ClosingSummary>("/closings", body);
}