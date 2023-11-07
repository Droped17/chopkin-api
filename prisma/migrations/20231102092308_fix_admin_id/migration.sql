/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `adminId` on the `chatroom` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `restaurantpendingedit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `reviewerId` on the `review` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_adminId_fkey`;

-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `booking` ADD COLUMN `bookingDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `packageId` INTEGER NOT NULL,
    MODIFY `bookingTime` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `chatroom` MODIFY `adminId` INTEGER NULL;

-- AlterTable
ALTER TABLE `customer` MODIFY `lastName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `restaurantpendingedit` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `reviewerId`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `TempBusinessTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` INTEGER NOT NULL,
    `openTime` VARCHAR(191) NOT NULL,
    `closedTime` VARCHAR(191) NOT NULL,
    `restaurantPendingEditId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TempBusinessTime` ADD CONSTRAINT `TempBusinessTime_restaurantPendingEditId_fkey` FOREIGN KEY (`restaurantPendingEditId`) REFERENCES `RestaurantPendingEdit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
