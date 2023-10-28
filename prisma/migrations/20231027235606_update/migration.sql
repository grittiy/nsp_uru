/*
  Warnings:

  - You are about to drop the column `startus` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `startus`,
    MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));
