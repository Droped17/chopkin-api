-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `tempbusinesstime` DROP FOREIGN KEY `TempBusinessTime_restaurantPendingEditId_fkey`;

-- DropForeignKey
ALTER TABLE `temprestaurantimage` DROP FOREIGN KEY `TempRestaurantImage_restaurantPendingEditId_fkey`;

-- AddForeignKey
ALTER TABLE `TempRestaurantImage` ADD CONSTRAINT `TempRestaurantImage_restaurantPendingEditId_fkey` FOREIGN KEY (`restaurantPendingEditId`) REFERENCES `RestaurantPendingEdit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TempBusinessTime` ADD CONSTRAINT `TempBusinessTime_restaurantPendingEditId_fkey` FOREIGN KEY (`restaurantPendingEditId`) REFERENCES `RestaurantPendingEdit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
