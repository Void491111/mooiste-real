import { OrderSource, OrderStatus, Prisma, PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { POS_CONFIG } from "../src/config/pos.config";
import { SEED_ORDERS_CONFIG } from "./seed-orders.config";
import {
  businessDateOf,
  createdAtOn,
  orderCountFor,
  pickSome,
  pickStatus,
  pickWeighted,
  randomInt,
} from "./seed-orders.lib";

/**
 * Bikin riwayat order palsu buat nguji dasbor & laporan.
 *
 * Sengaja TIDAK menyentuh Menu.stock. Ini data 30 hari ke belakang —
 * kalau stok ikut dikurangi, semua menu bakal habis sebelum kafe buka.
 * Beda dari order.service.ts yang memang harus ngurangin stok.
 */

const prisma = new PrismaClient();

type MenuForSeed = Prisma.MenuGetPayload<{ include: { category: true } }>;

async function loadMenus() {
  const menus = await prisma.menu.findMany({
    where: { isActive: true },
    include: { category: true },
  });

  if (menus.length === 0) {
    throw new Error("Belum ada menu di database. Jalankan seed menu dulu.");
  }

  return menus;
}

async function loadCashiers() {
  return prisma.user.findMany({ where: { role: "CASHIER", isActive: true } });
}

async function nextStartNumber(businessDate: Date) {
  const last = await prisma.order.findFirst({
    where: { businessDate },
    orderBy: { number: "desc" },
    select: { number: true },
  });

  if (!last) return 1;

  const suffix = Number(last.number.split("-").pop());
  return Number.isFinite(suffix) ? suffix + 1 : 1;
}

function formatOrderNumber(index: number) {
  return `${POS_CONFIG.order.numberPrefix}-${String(index).padStart(3, "0")}`;
}

function buildOrder(
  menus: MenuForSeed[],
  cashiers: User[],
  businessDate: Date,
  number: string,
) {
  const { linesPerOrder, qtyPerLine } = SEED_ORDERS_CONFIG;
  const { typeWeights, sourceWeights, paymentWeights } = SEED_ORDERS_CONFIG;

  const lineCount = randomInt(linesPerOrder.min, linesPerOrder.max);

  const items = pickSome(menus, lineCount).map(function toItem(menu) {
    return {
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
      qty: randomInt(qtyPerLine.min, qtyPerLine.max),
      station: menu.category.station,
      isDone: true,
    };
  });

  const subtotal = items.reduce(function sumLine(acc, item) {
    return acc + item.price * item.qty;
  }, 0);

  const tax = Math.round(subtotal * POS_CONFIG.tax.rate);
  const source = pickWeighted(sourceWeights);
  const status = pickStatus(source);
  const createdAt = createdAtOn(businessDate);
  const unpaid = status === OrderStatus.EXPIRED;

  const cashier =
    source === OrderSource.CASHIER && cashiers.length > 0
      ? pickSome(cashiers, 1)[0]
      : null;

  return {
    number,
    businessDate,
    status,
    type: pickWeighted(typeWeights),
    source,
    paymentMethod: unpaid ? null : pickWeighted(paymentWeights),
    cashierId: cashier ? cashier.id : null,
    subtotal,
    tax,
    total: subtotal + tax,
    createdAt,
    paidAt: unpaid ? null : createdAt,
    items: { create: items },
  };
}

async function seedOrders() {
  const [menus, cashiers] = await Promise.all([loadMenus(), loadCashiers()]);
  const { days } = SEED_ORDERS_CONFIG;

  let created = 0;

  for (let daysAgo = days - 1; daysAgo >= 0; daysAgo -= 1) {
    const businessDate = businessDateOf(daysAgo);
    const start = await nextStartNumber(businessDate);
    const count = orderCountFor(businessDate);

    for (let index = 0; index < count; index += 1) {
      const number = formatOrderNumber(start + index);

      await prisma.order.create({
        data: buildOrder(menus, cashiers, businessDate, number),
      });

      created += 1;
    }

    console.log(`[seedOrders] ${businessDate.toISOString().slice(0, 10)} -> ${count} order`);
  }

  console.log(`[seedOrders] selesai. ${created} order dibuat.`);
}

seedOrders()
  .catch(function onSeedError(error) {
    console.error("[seedOrders] gagal:", error);
    process.exit(1);
  })
  .finally(async function closeConnection() {
    await prisma.$disconnect();
  });