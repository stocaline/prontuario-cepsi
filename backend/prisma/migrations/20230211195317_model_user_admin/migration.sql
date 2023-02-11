-- AlterTable
ALTER TABLE "users" ALTER COLUMN "admin" DROP NOT NULL,
ALTER COLUMN "admin" SET DEFAULT false;
