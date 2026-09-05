import type { Prisma } from "@prisma/client";

export async function takeStock(
  tx: Prisma.TransactionClient,
  qtyByMenu: Map<string, number>,
  isPaidOnCreate: boolean,
) {
  for (const [menuId, qty] of qtyByMenu) {
    await tx.menu.update({
      where: { id: menuId },
      data: isPaidOnCreate
        ? { stock: { decrement: qty } }
        : { reservedQty: { increment: qty } },
    });
  }
}

export async function restoreStock(
  tx: Prisma.TransactionClient,
  lines: { menuId: string; qty: number }[],
  stockWasTaken: boolean,
) {
  for (const line of lines) {
    await tx.menu.update({
      where: { id: line.menuId },
      data: stockWasTaken
        ? { stock: { increment: line.qty } }
        : { reservedQty: { decrement: line.qty } },
    });
  }
}