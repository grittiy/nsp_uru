-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateTable
CREATE TABLE `Checks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('WAITING', 'NOTCHECKED', 'CHECKED') NOT NULL DEFAULT 'NOTCHECKED',
    `toolId` INTEGER NULL,
    `roomId` INTEGER NULL,
    `bookingId` INTEGER NOT NULL,
    `details` VARCHAR(255) NULL,
    `check` VARCHAR(20) NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Checks_toolId_idx`(`toolId`),
    INDEX `Checks_roomId_idx`(`roomId`),
    INDEX `Checks_userId_idx`(`userId`),
    INDEX `Checks_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Checks` ADD CONSTRAINT `Checks_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `Tools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checks` ADD CONSTRAINT `Checks_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checks` ADD CONSTRAINT `Checks_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Reservations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checks` ADD CONSTRAINT `Checks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
