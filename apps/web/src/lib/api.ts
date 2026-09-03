import { ClosingSummary } from "@/features/closing/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function readBody(response: Response) {
  return response.json().catch(function onParseError() {
    return null;
  });
}

function toErrorMessage(data: unknown, fallback: string) {
  const message = (data as { message?: unknown })?.message ?? fallback;
  return Array.isArray(message) ? message.join(", ") : String(message);
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
  });

  const data = await readBody(response);

  if (!response.ok) {
    throw new Error(toErrorMessage(data, `Gagal memuat ${path}`));
  }

  return data as T;
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await readBody(response);

  if (!response.ok) {
    throw new Error(toErrorMessage(data, `Gagal mengirim ke ${path}`));
  }

  return data as T;
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await readBody(response);

  if (!response.ok) {
    throw new Error(toErrorMessage(data, `Gagal mengubah ${path}`));
  }

  return data as T;
}

export async function apiUpload<T>(path: string, file: File): Promise<T> {
    const form = new FormData();
    form.append("file", file);

    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      credentials: "include",
      body: form,
    });

    const data = await readBody(response);

    if(!response.ok) {
      throw new Error(toErrorMessage(data, `Gagal mengunggah ke ${path}`));
    }

    return data as T
}



export async function apiDelete<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json"},
    credentials: "include",
  });

  const data = await readBody(response);

  if(!response.ok) {
    throw new Error(toErrorMessage(data, `Gagal menghapus ${path}`));
  }

  return data as T
}