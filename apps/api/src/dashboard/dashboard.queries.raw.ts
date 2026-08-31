import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { DASHBOARD_CONFIG } from "./dashboard.config";
import { toDateParam, type DateRange } from "./dashboard.range";
import type { HourlyPoint, menuRank } from "./dashboard.types";

const REVENUE_STATUSES = [...DASHBOARD_CONFIG.revenueStatuses];

export async function fetchHourly(
  prisma: PrismaService,
  range: DateRange,
): Promise<HourlyPoint[]> {
  const { timezone, openHours } = DASHBOARD_CONFIG;

  // createdAt disimpan sebagai timestamp tanpa zona, isinya UTC.
  // "AT TIME ZONE 'UTC'" bikin dia sadar zona, lalu yang kedua
  // mengubahnya ke jam dinding Jakarta. Tanpa yang pertama,
  // Postgres bakal mengira nilainya sudah jam Jakarta.
  const rows = await prisma.$queryRaw<Array<{ hour: number; orders: number }>>`
    SELECT
      EXTRACT(
        HOUR FROM ("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE ${timezone})
      )::int AS "hour",
      COUNT(*)::int AS "orders"
    FROM "Order"
    WHERE "businessDate"
            BETWEEN ${toDateParam(range.from)}::date
                AND ${toDateParam(range.to)}::date
      AND "status"::text IN (${Prisma.join(REVENUE_STATUSES)})
    GROUP BY 1
    ORDER BY 1
  `;

  const byHour = new Map(
    rows.map(function toEntry(row) {
      return [row.hour, row.orders] as const;
    }),
  );

  const points: HourlyPoint[] = [];

  // Jam sepi tetap dimasukkan sebagai 0, biar grafiknya tidak bolong.
  for (let hour = openHours.from; hour <= openHours.to; hour += 1) {
    points.push({ hour, orders: byHour.get(hour) ?? 0 });
  }

  return points;
}

export async function fetchMenuRanks(
  prisma: PrismaService,
  range: DateRange,
): Promise<menuRank[]> {
  // Mulai dari Menu, bukan dari OrderItem. Menu yang tidak laku
  // sama sekali tidak punya baris OrderItem, dan justru itu yang
  // paling perlu dilihat owner.
  return prisma.$queryRaw<menuRank[]>`
    WITH sold AS (
      SELECT i."menuId"              AS menu_id,
             SUM(i.qty)::int         AS qty,
             SUM(i.qty * i.price)::int AS revenue
      FROM "OrderItem" i
      JOIN "Order" o ON o.id = i."orderId"
      WHERE o."businessDate"
              BETWEEN ${toDateParam(range.from)}::date
                  AND ${toDateParam(range.to)}::date
        AND o."status"::text IN (${Prisma.join(REVENUE_STATUSES)})
      GROUP BY i."menuId"
    )
        SELECT m.id                      AS "menuId",
           m.name                    AS "name",
           c.label                   AS "category",
           COALESCE(s.qty, 0)        AS "qty",
           COALESCE(s.revenue, 0)    AS "revenue"
    FROM "Menu" m
    JOIN "Category" c ON c.id = m."categoryId"
    LEFT JOIN sold s ON s.menu_id = m.id
    WHERE m."isActive" = true
    ORDER BY "qty" DESC, m.name ASC
  `;
}