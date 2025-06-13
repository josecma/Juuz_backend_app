/*
  Warnings:

  - You are about to drop the column `delivery_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `pick_up_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `pickedup_at` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `milles` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to drop the column `model_id` on the `VehicleOrder` table. All the data in the column will be lost.
  - The primary key for the `business_stakeholders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `business_stakeholders` table. All the data in the column will be lost.
  - You are about to drop the `bids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[departure1_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destination1_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[business_id,role]` on the table `business_stakeholders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[make_id]` on the table `vehicle_makes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[manufacturer_id]` on the table `vehicle_manufacturers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departure1_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination1_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rute` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipperId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sub_status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `business_stakeholders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `stakeholder` to the `business_stakeholders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_sub_service_id_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_order_id_fkey";

-- DropIndex
DROP INDEX "vehicle_makes_name_idx";

-- DropIndex
DROP INDEX "vehicle_manufacturers_name_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_date",
DROP COLUMN "phone",
DROP COLUMN "pick_up_date",
DROP COLUMN "pickedup_at",
DROP COLUMN "version",
ADD COLUMN     "delivery_at" TIMESTAMP(3),
ADD COLUMN     "departure1_id" TEXT NOT NULL,
ADD COLUMN     "destination1_id" TEXT NOT NULL,
ADD COLUMN     "items" JSONB NOT NULL,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "pick_up_at" TIMESTAMP(3),
ADD COLUMN     "picked_up_at" TIMESTAMP(3),
ADD COLUMN     "rute" TEXT NOT NULL,
ADD COLUMN     "shipperId" TEXT NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "service_id" DROP NOT NULL,
ALTER COLUMN "milles" SET DEFAULT 0.00,
ALTER COLUMN "milles" SET DATA TYPE DECIMAL(10,2),
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "sub_status",
ADD COLUMN     "sub_status" TEXT NOT NULL,
ALTER COLUMN "car_count" DROP NOT NULL,
ALTER COLUMN "owner_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VehicleOrder" DROP COLUMN "model_id";

-- AlterTable
ALTER TABLE "business_stakeholders" DROP CONSTRAINT "business_stakeholders_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "stakeholder" JSONB NOT NULL,
ADD CONSTRAINT "business_stakeholders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "vehicle_makes" ADD COLUMN     "make_id" TEXT;

-- AlterTable
ALTER TABLE "vehicle_manufacturers" ADD COLUMN     "manufacturer_id" TEXT;

-- DropTable
DROP TABLE "bids";

-- DropTable
DROP TABLE "items";

-- CreateTable
CREATE TABLE "business_objects" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "type" JSONB NOT NULL,
    "base_value" TEXT,
    "description" TEXT,
    "metadata" JSONB,

    CONSTRAINT "business_objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stakeholder_bids" (
    "id" TEXT NOT NULL,
    "bidder_id" TEXT NOT NULL,
    "business_object_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "offer_details" JSONB NOT NULL,
    "bidding_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stakeholder_bids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_objects_business_id_key" ON "business_objects"("business_id");

-- CreateIndex
CREATE INDEX "business_objects_business_id_idx" ON "business_objects"("business_id");

-- CreateIndex
CREATE INDEX "business_objects_item_id_business_id_idx" ON "business_objects"("item_id", "business_id");

-- CreateIndex
CREATE INDEX "stakeholder_bids_bidding_at_idx" ON "stakeholder_bids"("bidding_at");

-- CreateIndex
CREATE INDEX "stakeholder_bids_bidder_id_idx" ON "stakeholder_bids"("bidder_id");

-- CreateIndex
CREATE INDEX "stakeholder_bids_business_id_idx" ON "stakeholder_bids"("business_id");

-- CreateIndex
CREATE INDEX "stakeholder_bids_business_object_id_business_id_bidder_id_idx" ON "stakeholder_bids"("business_object_id", "business_id", "bidder_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_departure1_id_key" ON "Order"("departure1_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_destination1_id_key" ON "Order"("destination1_id");

-- CreateIndex
CREATE INDEX "business_stakeholders_role_idx" ON "business_stakeholders"("role");

-- CreateIndex
CREATE INDEX "business_stakeholders_business_id_role_idx" ON "business_stakeholders"("business_id", "role");

-- CreateIndex
CREATE UNIQUE INDEX "business_stakeholders_business_id_role_key" ON "business_stakeholders"("business_id", "role");

-- CreateIndex
CREATE INDEX "businesses_status_idx" ON "businesses"("status");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_makes_make_id_key" ON "vehicle_makes"("make_id");

-- CreateIndex
CREATE INDEX "vehicle_makes_name_make_id_idx" ON "vehicle_makes"("name", "make_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_manufacturers_manufacturer_id_key" ON "vehicle_manufacturers"("manufacturer_id");

-- CreateIndex
CREATE INDEX "vehicle_manufacturers_name_manufacturer_id_idx" ON "vehicle_manufacturers"("name", "manufacturer_id");

-- AddForeignKey
ALTER TABLE "business_objects" ADD CONSTRAINT "business_objects_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_stakeholders" ADD CONSTRAINT "business_stakeholders_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stakeholder_bids" ADD CONSTRAINT "stakeholder_bids_bidder_id_fkey" FOREIGN KEY ("bidder_id") REFERENCES "business_stakeholders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stakeholder_bids" ADD CONSTRAINT "stakeholder_bids_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stakeholder_bids" ADD CONSTRAINT "stakeholder_bids_business_object_id_fkey" FOREIGN KEY ("business_object_id") REFERENCES "business_objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "departure_address_fkey" FOREIGN KEY ("departure1_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "destination_address_fkey" FOREIGN KEY ("destination1_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
