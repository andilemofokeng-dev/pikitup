-- CreateTable
CREATE TABLE "executives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT,
    "email" TEXT,
    "order" INTEGER NOT NULL DEFAULT 99,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cluster" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 99,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "depot_managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "depot" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 99,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "depot_managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "depots" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 99,

    CONSTRAINT "depots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "depots_name_key" ON "depots"("name");
