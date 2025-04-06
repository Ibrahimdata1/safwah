/*
  Warnings:

  - You are about to drop the `Homepage` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT,
ADD COLUMN     "source" TEXT;

-- DropTable
DROP TABLE "Homepage";
