-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetPasswordExpiresAt" DATETIME;
ALTER TABLE "User" ADD COLUMN "resetPasswordToken" TEXT;
