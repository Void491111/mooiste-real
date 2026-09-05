import { apiGet } from "@/lib/api";
export type PaidOrder = {
    id: string;
    number: string;
    total: number;
    source: "CASHIER" | "QR";
    createdAt: string;
};

export function getPaidOrders(date: string) {
    return apiGet<PaidOrder[]>(`/orders?date=${date}&status=PAID`);
}