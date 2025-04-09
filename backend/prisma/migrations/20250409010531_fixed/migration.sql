/*
  Warnings:

  - You are about to drop the column `title` on the `Threads` table. All the data in the column will be lost.
  - Added the required column `topic` to the `Threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Threads" DROP COLUMN "title",
ADD COLUMN     "topic" TEXT NOT NULL;
