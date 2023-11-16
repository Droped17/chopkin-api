/*
  Warnings:

  - You are about to drop the column `roomIdBySocket` on the `chatroom` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `roomIdBySocket`,
    ADD COLUMN `roomId` VARCHAR(191) NOT NULL;
