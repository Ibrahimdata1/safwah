/*
  Warnings:

  - Added the required column `order` to the `Paragraphs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paragraphs" ADD COLUMN     "order" INTEGER NOT NULL;
