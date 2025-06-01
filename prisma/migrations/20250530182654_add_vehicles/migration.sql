/*
  Warnings:

  - You are about to drop the column `driverId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `VehicleOrder` table. All the data in the column will be lost.
  - You are about to drop the column `category_path` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `license_plate` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `vin` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `join_company_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `secrets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_company_roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[vinNumber]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vinNumber` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_insuranceDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_service_id_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_vehicleInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_companyId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_companyId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleOrder" DROP CONSTRAINT "VehicleOrder_driverId_fkey";

-- DropIndex
DROP INDEX "vehicles_vin_key";

-- DropIndex
DROP INDEX "vehicles_vin_license_plate_idx";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "driverId";

-- AlterTable
ALTER TABLE "VehicleOrder" DROP COLUMN "driverId",
ADD COLUMN     "vehicleId" TEXT;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "category_path",
DROP COLUMN "color",
DROP COLUMN "license_plate",
DROP COLUMN "vin",
ADD COLUMN     "capacity" INTEGER,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "faceId" TEXT,
ADD COLUMN     "insuranceDoc" TEXT,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "service_id" TEXT,
ADD COLUMN     "updated_by" TEXT,
ADD COLUMN     "vehicleInfoId" TEXT,
ADD COLUMN     "vehicleType" TEXT,
ADD COLUMN     "vinNumber" TEXT NOT NULL,
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Driver";

-- DropTable
DROP TABLE "join_company_requests";

-- DropTable
DROP TABLE "requests";

-- DropTable
DROP TABLE "secrets";

-- DropTable
DROP TABLE "user_company_roles";

-- CreateTable
CREATE TABLE "company_join_requests" (
    "id" TEXT NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "company_join_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_invitation_requests" (
    "id" TEXT NOT NULL,
    "inviter_id" TEXT NOT NULL,
    "invitee" JSONB NOT NULL,
    "company_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "company_invitation_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_otp_secrets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "user_otp_secrets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_notification_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_notification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_pictures" (
    "vehicle_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "carrierIdentifier" TEXT,
    "usdot" TEXT,
    "mc" TEXT,
    "email" TEXT,
    "primaryAdminEmail" TEXT,
    "countryCode" TEXT,
    "phoneNumber" TEXT,
    "extension" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT,
    "rating" INTEGER DEFAULT 0,
    "dotNumber" TEXT,
    "stripe_account_id" TEXT,
    "exp_month" TEXT,
    "exp_year" TEXT,
    "card_number" TEXT,
    "phone" TEXT,
    "infoUrl" TEXT,
    "hours" TEXT,
    "name" TEXT,
    "insuranceDetailsId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NON_VERIFIED',
    "licenseType" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER DEFAULT 0,
    "owner_id" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_scores" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "last_dev" DOUBLE PRECISION NOT NULL,
    "last_avg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "company_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_member_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "company_member_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "company_join_requests_role_status_applicant_id_idx" ON "company_join_requests"("role", "status", "applicant_id");

-- CreateIndex
CREATE INDEX "company_invitation_requests_role_status_inviter_id_company__idx" ON "company_invitation_requests"("role", "status", "inviter_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_otp_secrets_user_id_key" ON "user_otp_secrets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_notification_tokens_token_key" ON "user_notification_tokens"("token");

-- CreateIndex
CREATE INDEX "user_notification_tokens_user_id_platform_idx" ON "user_notification_tokens"("user_id", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "user_notification_tokens_user_id_platform_key" ON "user_notification_tokens"("user_id", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_pictures_file_id_key" ON "vehicle_pictures"("file_id");

-- CreateIndex
CREATE INDEX "vehicle_pictures_vehicle_id_idx" ON "vehicle_pictures"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_address_id_key" ON "companies"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_dotNumber_key" ON "companies"("dotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "companies_card_number_key" ON "companies"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_insuranceDetailsId_key" ON "companies"("insuranceDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_owner_id_key" ON "companies"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_scores_company_id_key" ON "company_scores"("company_id");

-- CreateIndex
CREATE INDEX "company_scores_company_id_idx" ON "company_scores"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_member_roles_name_key" ON "company_member_roles"("name");

-- CreateIndex
CREATE INDEX "company_member_roles_name_idx" ON "company_member_roles"("name");

-- CreateIndex
CREATE INDEX "profile_pictures_user_id_idx" ON "profile_pictures"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vinNumber_key" ON "vehicles"("vinNumber");

-- AddForeignKey
ALTER TABLE "vehicle_pictures" ADD CONSTRAINT "vehicle_pictures_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_pictures" ADD CONSTRAINT "vehicle_pictures_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_insuranceDetailsId_fkey" FOREIGN KEY ("insuranceDetailsId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicleInfoId_fkey" FOREIGN KEY ("vehicleInfoId") REFERENCES "VehicleInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOrder" ADD CONSTRAINT "VehicleOrder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
