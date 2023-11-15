/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` ADD COLUMN `googleId` VARCHAR(33) NULL,
    MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateIndex
CREATE UNIQUE INDEX `User_googleId_key` ON `User`(`googleId`);
