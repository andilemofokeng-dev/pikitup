-- CreateTable
CREATE TABLE "annual_reports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Integrated Annual Report',
    "description" TEXT NOT NULL,
    "pages" INTEGER,
    "pdfUrl" TEXT,
    "viewUrl" TEXT,
    "isLatest" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 99,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annual_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corporate_documents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Corporate',
    "fileUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 99,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corporate_documents_pkey" PRIMARY KEY ("id")
);
