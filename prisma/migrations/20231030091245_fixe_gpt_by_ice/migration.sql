/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `payment` table. All the data in the column will be lost.
  - Added the required column `paymentId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_bookingId_fkey`;

-- AlterTable
ALTER TABLE `admin` MODIFY `isAdmin` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `paymentStatus`,
    ADD COLUMN `paymentId` VARCHAR(191) NOT NULL,
    MODIFY `orderStatus` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `chatroom` MODIFY `adminId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `bookingId`,
    MODIFY `paymentStatus` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `restaurant` MODIFY `status` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `review` MODIFY `isAnonymous` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
