/*
  Warnings:

  - You are about to drop the column `adminId` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `chatroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_customerId_fkey`;

-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `adminId`,
    DROP COLUMN `bookingId`,
    DROP COLUMN `customerId`;
