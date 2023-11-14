/*
  Warnings:

  - You are about to drop the column `restaurantPendingEditId` on the `temprestaurantimage` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `TempRestaurantImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `temprestaurantimage` DROP FOREIGN KEY `TempRestaurantImage_restaurantPendingEditId_fkey`;

-- AlterTable
ALTER TABLE `temprestaurantimage` DROP COLUMN `restaurantPendingEditId`,
    ADD COLUMN `restaurantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TempRestaurantImage` ADD CONSTRAINT `TempRestaurantImage_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
