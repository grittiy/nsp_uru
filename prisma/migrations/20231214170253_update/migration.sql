/*
  Warnings:

  - You are about to drop the column `check` on the `checks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `checks` DROP COLUMN `check`,
    ADD COLUMN `ch` VARCHAR(191) NOT NULL DEFAULT CONCAT('ch', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    ADD COLUMN `note` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `res` VARCHAR(191) NOT NULL DEFAULT CONCAT('res', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));
