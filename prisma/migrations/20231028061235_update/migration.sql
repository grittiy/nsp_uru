/*
  Warnings:

  - You are about to drop the column `statusMessage` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fname,lname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` DROP COLUMN `statusMessage`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `externalType` ENUM('GOVERNMENT', 'PRIVATE') NULL,
    ADD COLUMN `fax` CHAR(9) NULL,
    ADD COLUMN `fname` VARCHAR(50) NULL,
    ADD COLUMN `internalType` ENUM('TEACHER', 'STUDENT', 'STAFF') NULL,
    ADD COLUMN `lname` VARCHAR(50) NULL,
    ADD COLUMN `organizationName` VARCHAR(191) NULL,
    ADD COLUMN `person` VARCHAR(50) NULL,
    ADD COLUMN `phone` CHAR(10) NULL,
    ADD COLUMN `pname` VARCHAR(20) NULL,
    ADD COLUMN `position` VARCHAR(50) NULL,
    ADD COLUMN `sex` VARCHAR(5) NULL,
    ADD COLUMN `type` ENUM('INTERNAL', 'EXTERNAL') NULL,
    MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateIndex
CREATE UNIQUE INDEX `User_fname_lname_key` ON `User`(`fname`, `lname`);
