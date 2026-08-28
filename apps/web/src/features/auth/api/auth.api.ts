import { apiGet, apiPost } from "@/lib/api";
import type { SessionUser } from "../types";

export function login(email: string, password: string) {
  return apiPost<SessionUser>("/auth/login", { email, password });
}

export function logout() {
  return apiPost<{ ok: boolean }>("/auth/logout");
}

export function getMe() {
  return apiGet<SessionUser>("/auth/me");
}