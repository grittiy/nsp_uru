/*
  Warnings:

  - A unique constraint covering the columns `[num]` on the table `Tools` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,band]` on the table `Tools` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Tools_num_name_band_key` ON `tools`;

-- AlterTable
ALTER TABLE `rooms` MODIFY `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- AlterTable
ALTER TABLE `tools` MODIFY `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    MODIFY `toolrate` ENUM('NULL', 'SAMPLE', 'HOUR', 'DAY', 'RATES') NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0'));

-- CreateIndex
CREATE UNIQUE INDEX `Tools_num_key` ON `Tools`(`num`);

-- CreateIndex
CREATE UNIQUE INDEX `Tools_name_band_key` ON `Tools`(`name`, `band`);
