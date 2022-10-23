/*
  Warnings:

  - You are about to drop the column `location` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "location",
ADD COLUMN     "localization" TEXT;
