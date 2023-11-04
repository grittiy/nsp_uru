/*
  Warnings:

  - You are about to drop the column `lname` on the `user` table. All the data in the column will be lost.
  - The values [TEACHER] on the enum `User_internalType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[fname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_fname_lname_key` ON `user`;

-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `user` DROP COLUMN `lname`,
    MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    MODIFY `externalType` ENUM('NULL', 'GOVERNMENT', 'PRIVATE') NULL,
    MODIFY `internalType` ENUM('NULL', 'LECTURER', 'STUDENT', 'STAFF') NULL,
    MODIFY `type` ENUM('NULL', 'INTERNAL', 'EXTERNAL') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_fname_key` ON `User`(`fname`);
