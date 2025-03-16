/*
  Warnings:

  - You are about to drop the column `refrence` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "refrence",
ADD COLUMN     "reference" TEXT NOT NULL DEFAULT '';
