-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paraprahs" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "arText" TEXT NOT NULL,
    "engText" TEXT NOT NULL,

    CONSTRAINT "Paraprahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sharh" (
    "id" TEXT NOT NULL,
    "paragraphId" TEXT NOT NULL,
    "scholar" TEXT NOT NULL,
    "arExplain" TEXT NOT NULL,
    "engExplain" TEXT NOT NULL,

    CONSTRAINT "Sharh_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Paraprahs" ADD CONSTRAINT "Paraprahs_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharh" ADD CONSTRAINT "Sharh_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paraprahs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
