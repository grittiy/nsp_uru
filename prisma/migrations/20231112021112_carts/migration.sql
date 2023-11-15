-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateTable
CREATE TABLE `Carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `toolId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Carts_roomId_idx`(`roomId`),
    INDEX `Carts_toolId_idx`(`toolId`),
    INDEX `Carts_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `Tools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
