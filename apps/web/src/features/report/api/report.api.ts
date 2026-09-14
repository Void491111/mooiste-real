import { apiGet } from "@/lib/api";
import type { Report } from "../types";

export function getReport(from: string, to: string) {
  const params = new URLSearchParams({ from, to });

  return apiGet<Report>(`/reports?${params.toString()}`);
}