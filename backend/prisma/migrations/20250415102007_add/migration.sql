/*
  Warnings:

  - Added the required column `chapterId` to the `Matn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Matn" ADD COLUMN     "chapterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Matn" ADD CONSTRAINT "Matn_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
