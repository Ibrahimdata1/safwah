-- DropForeignKey
ALTER TABLE "Matn" DROP CONSTRAINT "Matn_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Sharh" DROP CONSTRAINT "Sharh_matnId_fkey";

-- AddForeignKey
ALTER TABLE "Matn" ADD CONSTRAINT "Matn_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharh" ADD CONSTRAINT "Sharh_matnId_fkey" FOREIGN KEY ("matnId") REFERENCES "Matn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
