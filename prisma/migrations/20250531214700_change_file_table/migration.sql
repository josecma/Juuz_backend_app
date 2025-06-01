/*
  Warnings:

  - You are about to drop the column `created_by` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `VehicleInfo` table. All the data in the column will be lost.
  - You are about to drop the column `address_id` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `model_id` to the `VehicleInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime_type` to the `files` table without a default value. This is not possible if the table is not empty.
  - Made the column `vehicleInfoId` on table `vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "VehicleInfo" DROP CONSTRAINT "VehicleInfo_modelId_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_address_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_vehicleInfoId_fkey";

-- DropIndex
DROP INDEX "companies_address_id_key";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "created_by",
DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
DROP COLUMN "version";

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "created_by",
DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
DROP COLUMN "version";

-- AlterTable
ALTER TABLE "VehicleInfo" DROP COLUMN "company_id",
DROP COLUMN "created_by",
DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "modelId",
DROP COLUMN "owner_id",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
DROP COLUMN "version",
ADD COLUMN     "model_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "address_id",
DROP COLUMN "created_by",
DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "rating",
DROP COLUMN "updated_by",
DROP COLUMN "version";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "mimeType",
ADD COLUMN     "mime_type" TEXT NOT NULL,
ALTER COLUMN "key" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "vehicle_pictures" ADD CONSTRAINT "vehicle_pictures_pkey" PRIMARY KEY ("vehicle_id", "file_id");

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "created_by",
DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
ALTER COLUMN "vehicleInfoId" SET NOT NULL;

-- CreateTable
CREATE TABLE "company_addresses" (
    "company_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "company_addresses_pkey" PRIMARY KEY ("company_id","address_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_addresses_company_id_key" ON "company_addresses"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_addresses_address_id_key" ON "company_addresses"("address_id");

-- CreateIndex
CREATE INDEX "company_addresses_company_id_idx" ON "company_addresses"("company_id");

-- CreateIndex
CREATE INDEX "addresses_location_idx" ON "addresses"("location");

-- AddForeignKey
ALTER TABLE "company_addresses" ADD CONSTRAINT "company_addresses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_addresses" ADD CONSTRAINT "company_addresses_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicleInfoId_fkey" FOREIGN KEY ("vehicleInfoId") REFERENCES "VehicleInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleInfo" ADD CONSTRAINT "VehicleInfo_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
