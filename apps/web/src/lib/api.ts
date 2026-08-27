const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    if(!response.ok) {
        throw new Error(`Gagal memuat ${path} (${response.status})`);
    }

    return response.json() as Promise<T>
}