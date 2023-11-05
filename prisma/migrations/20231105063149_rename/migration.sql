/*
  Warnings:

  - You are about to drop the `McSlide` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "McSlide" DROP CONSTRAINT "McSlide_mcImageId_fkey";

-- DropForeignKey
ALTER TABLE "McSlide" DROP CONSTRAINT "McSlide_mcSliderId_fkey";

-- DropTable
DROP TABLE "McSlide";

-- CreateTable
CREATE TABLE "McSliderItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mcImageId" INTEGER,
    "mcSliderId" INTEGER,

    CONSTRAINT "McSliderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "McSliderItem" ADD CONSTRAINT "McSliderItem_mcImageId_fkey" FOREIGN KEY ("mcImageId") REFERENCES "McImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McSliderItem" ADD CONSTRAINT "McSliderItem_mcSliderId_fkey" FOREIGN KEY ("mcSliderId") REFERENCES "McSlider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
