/*
  Warnings:

  - You are about to drop the column `isAproved` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "isAproved",
ADD COLUMN     "isApproved" BOOLEAN;
