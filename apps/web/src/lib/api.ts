const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Gagal memuat ${path} (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(function onParseError() {
    return null;
  });

  if (!response.ok) {
    const message = data?.message ?? `Gagal mengirim ke ${path} (${response.status})`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return data as T;
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await response.json().catch(function onParseError() {
    return null;
  });

  if (!response.ok) {
    const message = data?.message ?? `Gagal mengubah ${path} (${response.status})`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return data as T;
}