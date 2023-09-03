/*
  Warnings:

  - The `orderedBooks` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "orderBooks" DROP CONSTRAINT "orderBooks_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderedBooks",
ADD COLUMN     "orderedBooks" JSONB[];
