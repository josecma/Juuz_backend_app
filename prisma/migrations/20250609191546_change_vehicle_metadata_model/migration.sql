/*
  Warnings:

  - You are about to drop the column `years` on the `vehicle_make_models` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer_id` on the `vehicle_makes` table. All the data in the column will be lost.
  - You are about to drop the `vehicle_years` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,make_id,year]` on the table `vehicle_make_models` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `vehicle_make_models` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vehicle_makes" DROP CONSTRAINT "vehicle_makes_manufacturer_id_fkey";

-- DropIndex
DROP INDEX "vehicle_make_models_name_make_id_key";

-- DropIndex
DROP INDEX "vehicle_make_models_name_make_id_years_idx";

-- AlterTable
ALTER TABLE "vehicle_make_models" DROP COLUMN "years",
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_makes" DROP COLUMN "manufacturer_id";

-- DropTable
DROP TABLE "vehicle_years";

-- CreateTable
CREATE TABLE "manufacturer_makes" (
    "manufacturer_id" TEXT NOT NULL,
    "make_id" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "manufacturer_makes_make_id_manufacturer_id_idx" ON "manufacturer_makes"("make_id", "manufacturer_id");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_makes_manufacturer_id_make_id_key" ON "manufacturer_makes"("manufacturer_id", "make_id");

-- CreateIndex
CREATE INDEX "vehicle_make_models_name_make_id_year_idx" ON "vehicle_make_models"("name", "make_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_make_models_name_make_id_year_key" ON "vehicle_make_models"("name", "make_id", "year");

-- AddForeignKey
ALTER TABLE "manufacturer_makes" ADD CONSTRAINT "manufacturer_makes_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "vehicle_manufacturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manufacturer_makes" ADD CONSTRAINT "manufacturer_makes_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "vehicle_makes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
