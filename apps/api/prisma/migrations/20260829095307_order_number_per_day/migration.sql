/*
  Warnings:

  - A unique constraint covering the columns `[businessDate,number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessDate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_number_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "businessDate" DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_businessDate_number_key" ON "Order"("businessDate", "number");
