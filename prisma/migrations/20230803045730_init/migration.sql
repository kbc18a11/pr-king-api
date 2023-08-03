/*
  Warnings:

  - You are about to drop the column `github_api_id` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `repository_id` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the `state_id` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[github_apiId]` on the table `PullRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stateId` to the `PullRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PullRequest_github_api_id_key` ON `PullRequest`;

-- DropIndex
DROP INDEX `PullRequest_user_id_repository_id_idx` ON `PullRequest`;

-- AlterTable
ALTER TABLE `PullRequest` DROP COLUMN `github_api_id`,
    DROP COLUMN `repository_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `github_apiId` INTEGER NULL,
    ADD COLUMN `repositoryId` INTEGER NULL,
    ADD COLUMN `stateId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `state_id`;

-- CreateTable
CREATE TABLE `State` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `State_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `PullRequest_github_apiId_key` ON `PullRequest`(`github_apiId`);

-- CreateIndex
CREATE INDEX `PullRequest_userId_repositoryId_idx` ON `PullRequest`(`userId`, `repositoryId`);

-- AddForeignKey
ALTER TABLE `PullRequest` ADD CONSTRAINT `PullRequest_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
