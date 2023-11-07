-- AlterTable
ALTER TABLE `booking` ADD COLUMN `specialRequest` VARCHAR(191) NULL,
    MODIFY `totalKid` INTEGER NOT NULL DEFAULT 0;
