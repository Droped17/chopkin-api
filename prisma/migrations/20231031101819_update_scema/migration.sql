/*
  Warnings:

  - You are about to alter the column `price` on the `restaurant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `latitude` on the `restaurant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `longitude` on the `restaurant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `restaurant` MODIFY `price` INTEGER NOT NULL,
    MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL;
