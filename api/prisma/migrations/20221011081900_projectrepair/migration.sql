/*
  Warnings:

  - You are about to drop the column `isAproverd` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "isAproverd",
ADD COLUMN     "isAproved" BOOLEAN;
