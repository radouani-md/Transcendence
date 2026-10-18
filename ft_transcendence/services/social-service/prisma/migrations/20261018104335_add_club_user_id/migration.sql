/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Club_userId_key" ON "Club"("userId");
