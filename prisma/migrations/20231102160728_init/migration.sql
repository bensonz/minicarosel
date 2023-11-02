-- CreateTable
CREATE TABLE "McImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "metaData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "McImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "McSlide" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mcImageId" INTEGER NOT NULL,
    "mcSliderId" INTEGER,

    CONSTRAINT "McSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "McSlider" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "McSlider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "McSlide" ADD CONSTRAINT "McSlide_mcImageId_fkey" FOREIGN KEY ("mcImageId") REFERENCES "McImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McSlide" ADD CONSTRAINT "McSlide_mcSliderId_fkey" FOREIGN KEY ("mcSliderId") REFERENCES "McSlider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
