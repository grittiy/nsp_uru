/*
  Warnings:

  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - A unique constraint covering the columns `[linename]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `linename` VARCHAR(50) NULL,
    ADD COLUMN `statusMessage` VARCHAR(500) NULL,
    MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    MODIFY `name` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_linename_key` ON `User`(`linename`);
