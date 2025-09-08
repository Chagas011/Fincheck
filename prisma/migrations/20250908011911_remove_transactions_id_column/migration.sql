/*
  Warnings:

  - You are about to drop the column `transactionId` on the `bank_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."bank_accounts" DROP COLUMN "transactionId";
