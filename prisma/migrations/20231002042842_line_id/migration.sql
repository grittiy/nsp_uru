/*
  Warnings:

  - You are about to drop the column `linename` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lineId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_linename_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `linename`,
    ADD COLUMN `lineId` VARCHAR(33) NULL,
    MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateIndex
CREATE UNIQUE INDEX `User_lineId_key` ON `User`(`lineId`);
