-- AlterTable
ALTER TABLE "Homepage" ADD COLUMN     "image" TEXT,
ADD COLUMN     "source" TEXT,
ALTER COLUMN "type" DROP NOT NULL;
