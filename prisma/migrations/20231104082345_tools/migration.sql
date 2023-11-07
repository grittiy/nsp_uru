/*
  Warnings:

  - Added the required column `updatedAt` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateTable
CREATE TABLE `Tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    `num` CHAR(6) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `band` VARCHAR(50) NOT NULL,
    `number` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,
    `toolimage` TEXT NOT NULL,
    `toolrate` ENUM('NULL', 'SAMPLE', 'DAY', 'RATES') NULL,
    `internal` INTEGER NULL,
    `external` INTEGER NULL,
    `rate` VARCHAR(50) NULL,
    `details` VARCHAR(255) NOT NULL,
    `breakdown` INTEGER NULL,
    `repair` INTEGER NULL,
    `lost` INTEGER NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tools_num_name_band_key`(`num`, `name`, `band`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
