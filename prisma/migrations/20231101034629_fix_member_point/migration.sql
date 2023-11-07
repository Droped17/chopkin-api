/*
  Warnings:

  - Added the required column `message` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `memberPoint` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `message` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PackageEditPending` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `img` VARCHAR(191) NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PackageEditPending` ADD CONSTRAINT `PackageEditPending_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
