/*
  Warnings:

  - You are about to alter the column `sit_no` on the `room` table. The data in that column could be lost. The data in that column will be cast from `Char(4)` to `Int`.

*/
-- AlterTable
ALTER TABLE `room` MODIFY `sit_no` INTEGER NOT NULL,
    MODIFY `location` TEXT NOT NULL,
    MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));
