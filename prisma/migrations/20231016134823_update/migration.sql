/*
  Warnings:

  - Made the column `roomimage` on table `room` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `room` MODIFY `roomimage` TEXT NOT NULL,
    MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));
