/*
  Warnings:

  - A unique constraint covering the columns `[supportId]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "supportId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Donation_supportId_key" ON "Donation"("supportId");
