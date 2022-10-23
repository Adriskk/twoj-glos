/*
  Warnings:

  - You are about to drop the column `projectsize` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `PESEL` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "projectsize",
ADD COLUMN     "additional_information" TEXT,
ADD COLUMN     "lat" DECIMAL(65,30),
ADD COLUMN     "lng" DECIMAL(65,30),
ADD COLUMN     "project_size" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "PESEL",
ADD COLUMN     "pesel" DECIMAL(65,30);
