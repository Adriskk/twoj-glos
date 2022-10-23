/*
  Warnings:

  - You are about to alter the column `title` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(85)`.
  - You are about to alter the column `description` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.
  - You are about to alter the column `additional_information` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(320)`.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "title" SET DATA TYPE VARCHAR(85),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(4000),
ALTER COLUMN "additional_information" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(320);
