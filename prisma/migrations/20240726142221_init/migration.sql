/*
  Warnings:

  - A unique constraint covering the columns `[trxCode]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trxCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "trxCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_trxCode_key" ON "Transaction"("trxCode");
