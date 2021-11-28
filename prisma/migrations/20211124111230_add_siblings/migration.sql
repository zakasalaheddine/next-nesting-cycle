-- AlterTable
ALTER TABLE `Bird` ADD COLUMN `nestId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Siblings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nestId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiblingsDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `birdId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
