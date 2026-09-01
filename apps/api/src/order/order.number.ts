import { Prisma } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";

/**
 * Identitas "hari kerja" sebuah waktu, sebagai tanggal murni.
 *
 * Dikembalikan sebagai tengah malam UTC, bukan waktu lokal. Kolom
 * businessDate bertipe @db.Date, dan Postgres mengambil bagian tanggal
 * dalam UTC — kalau yang dikirim waktu lokal sore/malam, tanggalnya
 * bisa mundur sehari dari yang dimaksud.
 */
export function startOfBusinessDay(now: Date) {
  const shifted = new Date(now);

  // Sebelum jam buka masih dihitung sebagai hari sebelumnya.
  if (shifted.getHours() < POS_CONFIG.order.businessDayStartHour) {
    shifted.setDate(shifted.getDate() - 1);
  }

  return new Date(
    Date.UTC(shifted.getFullYear(), shifted.getMonth(), shifted.getDate()),
  );
}

/**
 * Nomor urut berikutnya untuk satu hari kerja.
 *
 * Mencari berdasarkan businessDate — kolom yang sama yang dijaga oleh
 * @@unique([businessDate, number]). Sebelumnya ini mencari lewat
 * createdAt, dan dua patokan berbeda itu yang bikin nomor bentrok.
 */
export async function nextOrderNumber(
  tx: Prisma.TransactionClient,
  businessDate: Date,
) {
  const last = await tx.order.findFirst({
    where: { businessDate },
    orderBy: { number: "desc" },
    select: { number: true },
  });

  const lastSequence = last ? Number(last.number.split("-")[1]) : 0;
  const next = Number.isFinite(lastSequence) ? lastSequence + 1 : 1;

  return `${POS_CONFIG.order.numberPrefix}-${String(next).padStart(3, "0")}`;
}