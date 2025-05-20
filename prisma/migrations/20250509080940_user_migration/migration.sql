/*
  Warnings:

  - You are about to drop the column `updated_at` on the `identities` table. All the data in the column will be lost.
  - You are about to drop the column `attempts` on the `user_authentication_processes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user_authentication_processes` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `user_authentication_processes` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `user_authentication_processes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user_authentication_processes` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_credentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_hotp_counters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_identities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profile_pictures` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[identity_id]` on the table `identity_verifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authentication_process_id]` on the table `user_authentication_processes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `identities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authentication_process_id` to the `user_authentication_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_authentication_processes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AblyChannel" DROP CONSTRAINT "AblyChannel_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "Negotiation" DROP CONSTRAINT "Negotiation_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Negotiation" DROP CONSTRAINT "Negotiation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_evaluated_Id_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_evaluator_Id_fkey";

-- DropForeignKey
ALTER TABLE "evidences" DROP CONSTRAINT "evidences_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_channels" DROP CONSTRAINT "user_channels_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_points" DROP CONSTRAINT "user_points_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_profile_pictures" DROP CONSTRAINT "user_profile_pictures_file_id_fkey";

-- DropForeignKey
ALTER TABLE "user_profile_pictures" DROP CONSTRAINT "user_profile_pictures_user_id_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "identities" DROP COLUMN "updated_at",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "identity_verifications" ALTER COLUMN "identity_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_authentication_processes" DROP COLUMN "attempts",
DROP COLUMN "createdAt",
DROP COLUMN "metadata",
DROP COLUMN "method",
DROP COLUMN "status",
ADD COLUMN     "authentication_process_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "is_active",
DROP COLUMN "password",
DROP COLUMN "phone";

-- DropTable
DROP TABLE "user_credentials";

-- DropTable
DROP TABLE "user_hotp_counters";

-- DropTable
DROP TABLE "user_identities";

-- DropTable
DROP TABLE "user_profile_pictures";

-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentication_processes" (
    "id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authentication_processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_pictures" (
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "profile_pictures_pkey" PRIMARY KEY ("user_id","file_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_user_id_key" ON "credentials"("user_id");

-- CreateIndex
CREATE INDEX "credentials_user_id_expires_at_idx" ON "credentials"("user_id", "expires_at");

-- CreateIndex
CREATE INDEX "authentication_processes_status_method_idx" ON "authentication_processes"("status", "method");

-- CreateIndex
CREATE UNIQUE INDEX "profile_pictures_user_id_key" ON "profile_pictures"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_pictures_file_id_key" ON "profile_pictures"("file_id");

-- CreateIndex
CREATE UNIQUE INDEX "identity_verifications_identity_id_key" ON "identity_verifications"("identity_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentication_processes_authentication_process_id_key" ON "user_authentication_processes"("authentication_process_id");

-- CreateIndex
CREATE INDEX "user_authentication_processes_user_id_idx" ON "user_authentication_processes"("user_id");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "identity_verifications" ADD CONSTRAINT "identity_verifications_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "identities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_pictures" ADD CONSTRAINT "profile_pictures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_pictures" ADD CONSTRAINT "profile_pictures_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
