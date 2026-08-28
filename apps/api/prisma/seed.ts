import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { code: "COFFEE", label: "Coffee", sortOrder: 1, station: "BAR" as const },
  { code: "NON_COFFEE", label: "Non Coffee", sortOrder: 2, station: "BAR" as const },
  { code: "FOOD", label: "Food", sortOrder: 3, station: "KITCHEN" as const },
  { code: "SNACK", label: "Snack", sortOrder: 4, station: "KITCHEN" as const },
];  

const MENUS = [
  { name: "Kopi Gula Aren", price: 28000, stock: 73, category: "COFFEE" },
  { name: "Cappuccino", price: 30000, stock: 12, category: "COFFEE" },
  { name: "Americano", price: 24000, stock: 0, category: "COFFEE" },
  { name: "Matcha Latte", price: 32000, stock: 8, category: "NON_COFFEE" },
  { name: "Es Teh Manis", price: 12000, stock: 40, category: "NON_COFFEE" },
  { name: "Croissant", price: 22000, stock: 5, category: "FOOD" },
  { name: "Pisang Goreng", price: 18000, stock: 24, category: "SNACK" },
  { name: "Kentang Goreng", price: 20000, stock: 15, category: "SNACK" },
  { name: "Roti Bakar Coklat", price: 16000, stock: 0, category: "SNACK" },
  { name: "Onion Ring", price: 22000, stock: 7, category: "SNACK" },
];

async function seedCategories() {
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { code: category.code },
      update: {
        label: category.label,
        sortOrder: category.sortOrder,
        station: category.station,
      },
      create: category,
    });
  }
}

async function seedMenus() {
  for (const [index, menu] of MENUS.entries()) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { code: menu.category },
    });

    const existing = await prisma.menu.findFirst({ where: { name: menu.name } });
    if (existing) continue;

    await prisma.menu.create({
      data: {
        name: menu.name,
        price: menu.price,
        stock: menu.stock,
        sortOrder: index,
        categoryId: category.id,
      },
    });
  }
}

async function main() {
  await seedCategories();
  await seedMenus();
  console.log("Seed selesai");
}

main()
  .catch(function onSeedError(error) {
    console.error(error);
    process.exit(1);
  })
  .finally(async function closeConnection() {
    await prisma.$disconnect();
  });
