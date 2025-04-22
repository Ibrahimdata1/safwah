/*
  Warnings:

  - You are about to drop the column `ar` on the `Footnote` table. All the data in the column will be lost.
  - You are about to drop the column `eng` on the `Footnote` table. All the data in the column will be lost.
  - You are about to drop the column `arText` on the `Matn` table. All the data in the column will be lost.
  - You are about to drop the column `engText` on the `Matn` table. All the data in the column will be lost.
  - You are about to drop the column `arExplain` on the `Sharh` table. All the data in the column will be lost.
  - You are about to drop the column `engExplain` on the `Sharh` table. All the data in the column will be lost.
  - You are about to drop the column `mixedText` on the `Sharh` table. All the data in the column will be lost.
  - Added the required column `footnoteText` to the `Footnote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matnText` to the `Matn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sharhText` to the `Sharh` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Footnote" DROP COLUMN "ar",
DROP COLUMN "eng",
ADD COLUMN     "footnoteText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Matn" DROP COLUMN "arText",
DROP COLUMN "engText",
ADD COLUMN     "matnText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sharh" DROP COLUMN "arExplain",
DROP COLUMN "engExplain",
DROP COLUMN "mixedText",
ADD COLUMN     "sharhText" TEXT NOT NULL;
