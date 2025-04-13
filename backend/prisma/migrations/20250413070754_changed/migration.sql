/*
  Warnings:

  - You are about to drop the column `paragraphId` on the `Sharh` table. All the data in the column will be lost.
  - You are about to drop the `Paragraphs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matnId` to the `Sharh` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Paragraphs" DROP CONSTRAINT "Paragraphs_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Sharh" DROP CONSTRAINT "Sharh_paragraphId_fkey";

-- AlterTable
ALTER TABLE "Sharh" DROP COLUMN "paragraphId",
ADD COLUMN     "matnId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Paragraphs";

-- CreateTable
CREATE TABLE "Matn" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "arText" TEXT NOT NULL,
    "engText" TEXT,

    CONSTRAINT "Matn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Matn" ADD CONSTRAINT "Matn_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharh" ADD CONSTRAINT "Sharh_matnId_fkey" FOREIGN KEY ("matnId") REFERENCES "Matn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
