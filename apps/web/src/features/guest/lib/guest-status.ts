import type { GuestOrderStatus } from "../types";

type StatusCopy = { title: string; hint: string };

export const STATUS_COPY: Record<GuestOrderStatus, StatusCopy> = {
  PENDING_PAYMENT: {
    title: "Menunggu pembayaran",
    hint: "Tunjukkan nomor ini ke kasir untuk bayar.",
  },
  PAID: {
    title: "Sudah dibayar",
    hint: "Pesanan kamu lagi disiapkan.",
  },
  IN_PROGRESS: {
    title: "Sedang dibuat",
    hint: "Tunggu sebentar ya.",
  },
  READY: {
    title: "Siap diambil",
    hint: "Silakan ambil pesanan di kasir.",
  },
  DONE: {
    title: "Selesai",
    hint: "Terima kasih, selamat menikmati.",
  },
  CANCELLED: {
    title: "Dibatalkan",
    hint: "Pesanan ini dibatalkan kasir.",
  },
  EXPIRED: {
    title: "Kedaluwarsa",
    hint: "Pesanan ini sudah tidak berlaku.",
  },
};