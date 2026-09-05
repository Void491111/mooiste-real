import { ConflictException } from "@nestjs/common";
import { OrderStatus } from "@prisma/client";
import { POS_CONFIG } from "../config/pos.config";
import { PrismaService } from "../prisma/prisma.service";

export async function assertDayIsOpen(
  prisma: PrismaService,
  businessDate: Date,
) {
  const closed = await prisma.cashClosing.findUnique({
    where: { businessDate },
  });

  if (closed) {
    throw new ConflictException(
      "Kas tanggal ini sudah ditutup. Buka kembali dulu di halaman Tutup Kas.",
    );
  }
}

export function assertCancellable(status: OrderStatus) {
  if (status === OrderStatus.CANCELLED) {
    throw new ConflictException("Pesanan ini sudah dibatalkan");
  }

  const cancellable: OrderStatus[] = [...POS_CONFIG.order.cancellableStatuses];

  if (!cancellable.includes(status)) {
    throw new ConflictException(
      "Pesanan yang sudah selesai tidak bisa dibatalkan",
    );
  }
}   