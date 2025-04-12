/*
  Warnings:

  - You are about to drop the `Paraprahs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paraprahs" DROP CONSTRAINT "Paraprahs_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Sharh" DROP CONSTRAINT "Sharh_paragraphId_fkey";

-- DropTable
DROP TABLE "Paraprahs";

-- CreateTable
CREATE TABLE "Paragraphs" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "arText" TEXT NOT NULL,
    "engText" TEXT,

    CONSTRAINT "Paragraphs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Paragraphs" ADD CONSTRAINT "Paragraphs_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharh" ADD CONSTRAINT "Sharh_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraphs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
