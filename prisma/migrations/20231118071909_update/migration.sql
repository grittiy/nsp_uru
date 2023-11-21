-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usr` VARCHAR(191) NOT NULL DEFAULT CONCAT('usr', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `lineId` VARCHAR(33) NULL,
    `googleId` VARCHAR(33) NULL,
    `role` ENUM('ADMIN', 'DIRECTOR', 'EMPLOYEE', 'USER') NOT NULL DEFAULT 'USER',
    `pname` VARCHAR(20) NULL,
    `fname` VARCHAR(50) NULL,
    `sex` VARCHAR(5) NULL,
    `position` VARCHAR(50) NULL,
    `person` VARCHAR(50) NULL,
    `phone` CHAR(10) NULL,
    `fax` CHAR(9) NULL,
    `type` ENUM('NULL', 'INTERNAL', 'EXTERNAL') NULL,
    `organizationName` VARCHAR(191) NULL,
    `internalType` ENUM('NULL', 'LECTURER', 'STUDENT', 'STAFF') NULL,
    `externalType` ENUM('NULL', 'GOVERNMENT', 'PRIVATE') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_lineId_key`(`lineId`),
    UNIQUE INDEX `User_googleId_key`(`googleId`),
    UNIQUE INDEX `User_fname_key`(`fname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room` VARCHAR(191) NOT NULL DEFAULT CONCAT('room', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    `name` VARCHAR(50) NOT NULL,
    `details` VARCHAR(255) NOT NULL,
    `no` VARCHAR(4) NOT NULL,
    `building` VARCHAR(255) NOT NULL,
    `location` TEXT NOT NULL,
    `roomimage` TEXT NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Rooms_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tool` VARCHAR(191) NOT NULL DEFAULT CONCAT('tool', LPAD(FLOOR(RAND() * 10000000000), 7, '0')),
    `num` CHAR(6) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `band` VARCHAR(50) NOT NULL,
    `number` INTEGER NOT NULL,
    `balance` INTEGER NULL,
    `toolimage` TEXT NOT NULL,
    `toolrate` ENUM('NULL', 'SAMPLE', 'HOUR', 'DAY', 'RATES') NULL,
    `internal` INTEGER NULL,
    `external` INTEGER NULL,
    `rate` VARCHAR(50) NULL,
    `details` VARCHAR(255) NULL,
    `breakdown` INTEGER NULL,
    `repair` INTEGER NULL,
    `lost` INTEGER NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tools_num_key`(`num`),
    UNIQUE INDEX `Tools_name_band_key`(`name`, `band`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NULL,
    `toolId` INTEGER NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Carts_roomId_idx`(`roomId`),
    INDEX `Carts_toolId_idx`(`toolId`),
    INDEX `Carts_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `objective` VARCHAR(255) NOT NULL,
    `startdate` DATETIME(3) NOT NULL,
    `enddate` DATETIME(3) NOT NULL,
    `status` ENUM('WAITING', 'SANCTION', 'OVERRIDE') NOT NULL DEFAULT 'WAITING',
    `details` VARCHAR(255) NULL,
    `roomId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Reservations_roomId_idx`(`roomId`),
    INDEX `Reservations_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `Tools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
