-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `note` VARCHAR(255) NULL,
    ADD COLUMN `toolId` INTEGER NULL,
    MODIFY `roomId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateIndex
CREATE INDEX `Reservations_toolId_idx` ON `Reservations`(`toolId`);

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `Tools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
