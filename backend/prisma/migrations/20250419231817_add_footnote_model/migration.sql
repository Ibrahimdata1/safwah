-- CreateTable
CREATE TABLE "Footnote" (
    "id" TEXT NOT NULL,
    "sharhId" TEXT NOT NULL,
    "ar" TEXT NOT NULL,
    "eng" TEXT NOT NULL,

    CONSTRAINT "Footnote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Footnote" ADD CONSTRAINT "Footnote_sharhId_fkey" FOREIGN KEY ("sharhId") REFERENCES "Sharh"("id") ON DELETE CASCADE ON UPDATE CASCADE;
