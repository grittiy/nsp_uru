/*
  Warnings:

  - Made the column `name` on table `reservations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `objective` on table `reservations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startdate` on table `reservations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enddate` on table `reservations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `reservations` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `objective` VARCHAR(255) NOT NULL,
    MODIFY `startdate` DATETIME(3) NOT NULL,
    MODIFY `enddate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));
