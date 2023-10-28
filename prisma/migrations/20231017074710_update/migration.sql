/*
  Warnings:

  - You are about to drop the column `sit_no` on the `room` table. All the data in the column will be lost.
  - Added the required column `no` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` DROP COLUMN `sit_no`,
    ADD COLUMN `no` VARCHAR(4) NOT NULL,
    MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));
