/*
  Warnings:

  - You are about to drop the column `email` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `lineId` on the `carts` table. All the data in the column will be lost.
  - Made the column `userId` on table `carts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `Carts_userId_fkey`;

-- DropIndex
DROP INDEX `Carts_email_idx` ON `carts`;

-- DropIndex
DROP INDEX `Carts_lineId_idx` ON `carts`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `email`,
    DROP COLUMN `lineId`,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
