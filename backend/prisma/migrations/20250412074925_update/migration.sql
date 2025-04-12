/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paraprahs" DROP CONSTRAINT "Paraprahs_bookId_fkey";

-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "coverUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Paraprahs" ADD CONSTRAINT "Paraprahs_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
