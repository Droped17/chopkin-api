/*
  Warnings:

  - You are about to drop the column `packageId` on the `businesstime` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `googleAddress` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `nationId` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `district` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryIndex` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationIndex` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_paymentId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `businesstime` DROP FOREIGN KEY `BusinessTime_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `businesstime` DROP FOREIGN KEY `BusinessTime_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `package` DROP FOREIGN KEY `Package_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `Restaurant_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `Restaurant_districtId_fkey`;

-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `Restaurant_nationId_fkey`;

-- DropForeignKey
ALTER TABLE `restaurantimage` DROP FOREIGN KEY `RestaurantImage_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `reviewimage` DROP FOREIGN KEY `ReviewImage_reviewId_fkey`;

-- AlterTable
ALTER TABLE `businesstime` DROP COLUMN `packageId`;

-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `categoryId`,
    DROP COLUMN `districtId`,
    DROP COLUMN `googleAddress`,
    DROP COLUMN `nationId`,
    ADD COLUMN `categoryIndex` INTEGER NOT NULL,
    ADD COLUMN `districtIndex` INTEGER NULL,
    ADD COLUMN `latitude` VARCHAR(191) NULL,
    ADD COLUMN `longitude` VARCHAR(191) NULL,
    ADD COLUMN `nationIndex` INTEGER NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT '1234';

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `district`;

-- DropTable
DROP TABLE `nation`;

-- CreateTable
CREATE TABLE `RestaurantPendingEdit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurantName` VARCHAR(191) NOT NULL,
    `profileImg` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `price` VARCHAR(191) NOT NULL,
    `categoryIndex` INTEGER NOT NULL,
    `districtIndex` INTEGER NULL,
    `nationIndex` INTEGER NOT NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RestaurantPendingEdit_restaurantName_key`(`restaurantName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RestaurantPendingEdit` ADD CONSTRAINT `RestaurantPendingEdit_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantImage` ADD CONSTRAINT `RestaurantImage_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Package` ADD CONSTRAINT `Package_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImage` ADD CONSTRAINT `ReviewImage_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusinessTime` ADD CONSTRAINT `BusinessTime_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
