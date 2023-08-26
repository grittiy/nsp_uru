/*
  Warnings:

  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_avatar_key` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    MODIFY `email` VARCHAR(191) NOT NULL;
