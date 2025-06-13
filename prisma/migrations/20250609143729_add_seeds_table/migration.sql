/*
  Warnings:

  - You are about to drop the column `vehicleType` on the `FleetRecord` table. All the data in the column will be lost.
  - You are about to drop the column `insuranceDoc` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile_pictures` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vehicle_type` to the `FleetRecord` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `vehicle_type` on the `VehicleOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `e_tag` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Made the column `year` on table `vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "VehicleInfo" DROP CONSTRAINT "VehicleInfo_model_id_fkey";

-- DropForeignKey
ALTER TABLE "VehicleOrder" DROP CONSTRAINT "VehicleOrder_model_id_fkey";

-- DropForeignKey
ALTER TABLE "profile_pictures" DROP CONSTRAINT "profile_pictures_file_id_fkey";

-- DropForeignKey
ALTER TABLE "profile_pictures" DROP CONSTRAINT "profile_pictures_user_id_fkey";

-- AlterTable
ALTER TABLE "FleetRecord" DROP COLUMN "vehicleType",
ADD COLUMN     "vehicle_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cancelled_at" TIMESTAMP(3),
ADD COLUMN     "delivered_at" TIMESTAMP(3),
ADD COLUMN     "pickedup_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VehicleOrder" ADD COLUMN     "vehicleMakeModelId" TEXT,
DROP COLUMN "vehicle_type",
ADD COLUMN     "vehicle_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "e_tag" TEXT NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "insuranceDoc",
DROP COLUMN "vehicleType",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "insurance_doc" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "vehicle_type" TEXT,
ALTER COLUMN "year" SET NOT NULL;

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "profile_pictures";

-- DropEnum
DROP TYPE "VehicleType";

-- CreateTable
CREATE TABLE "user_profile_pictures" (
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "user_profile_pictures_pkey" PRIMARY KEY ("user_id","file_id")
);

-- CreateTable
CREATE TABLE "company_drivers" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_VERIFIED',
    "eligibility" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "vehicle_manufacturers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vehicle_manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vehicle_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_years" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "vehicle_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_make_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "years" JSONB NOT NULL,
    "make_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicle_make_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_makes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicle_makes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seeds" (
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "seeds_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_pictures_user_id_key" ON "user_profile_pictures"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_pictures_file_id_key" ON "user_profile_pictures"("file_id");

-- CreateIndex
CREATE INDEX "user_profile_pictures_user_id_idx" ON "user_profile_pictures"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_drivers_id_key" ON "company_drivers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_manufacturers_name_key" ON "vehicle_manufacturers"("name");

-- CreateIndex
CREATE INDEX "vehicle_manufacturers_name_idx" ON "vehicle_manufacturers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_types_name_key" ON "vehicle_types"("name");

-- CreateIndex
CREATE INDEX "vehicle_types_name_idx" ON "vehicle_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_years_year_key" ON "vehicle_years"("year");

-- CreateIndex
CREATE INDEX "vehicle_years_year_idx" ON "vehicle_years"("year");

-- CreateIndex
CREATE INDEX "vehicle_make_models_name_make_id_years_idx" ON "vehicle_make_models"("name", "make_id", "years");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_make_models_name_make_id_key" ON "vehicle_make_models"("name", "make_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_makes_name_key" ON "vehicle_makes"("name");

-- CreateIndex
CREATE INDEX "vehicle_makes_name_idx" ON "vehicle_makes"("name");

-- CreateIndex
CREATE INDEX "seeds_name_idx" ON "seeds"("name");

-- AddForeignKey
ALTER TABLE "user_profile_pictures" ADD CONSTRAINT "user_profile_pictures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile_pictures" ADD CONSTRAINT "user_profile_pictures_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "company_member_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_drivers" ADD CONSTRAINT "company_drivers_id_fkey" FOREIGN KEY ("id") REFERENCES "company_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleInfo" ADD CONSTRAINT "VehicleInfo_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicle_make_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_make_models" ADD CONSTRAINT "vehicle_make_models_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "vehicle_makes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_makes" ADD CONSTRAINT "vehicle_makes_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "vehicle_manufacturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOrder" ADD CONSTRAINT "VehicleOrder_vehicleMakeModelId_fkey" FOREIGN KEY ("vehicleMakeModelId") REFERENCES "vehicle_make_models"("id") ON DELETE SET NULL ON UPDATE CASCADE;
