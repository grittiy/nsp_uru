-- AlterTable
ALTER TABLE `carts` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `lineId` VARCHAR(191) NULL,
    MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateIndex
CREATE INDEX `Carts_email_idx` ON `Carts`(`email`);

-- CreateIndex
CREATE INDEX `Carts_lineId_idx` ON `Carts`(`lineId`);
