/*
  Warnings:

  - You are about to drop the column `matricula` on the `users` table. All the data in the column will be lost.
  - Added the required column `registration` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "matricula",
ADD COLUMN     "email_valid" BOOLEAN DEFAULT false,
ADD COLUMN     "registration" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "social_name" BOOLEAN,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "schooling" TEXT,
    "gender" TEXT,
    "rg" TEXT,
    "cpf" TEXT,
    "status" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "family_income" DOUBLE PRECISION,
    "career" TEXT,
    "workplace" TEXT,
    "minor" BOOLEAN NOT NULL,
    "last_visit" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "Owner_id" TEXT NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adresses" (
    "id" TEXT NOT NULL,
    "cep" TEXT,
    "city" TEXT,
    "state" TEXT,
    "district" TEXT,
    "street" TEXT,
    "number" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountables" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kindship" TEXT,
    "rgAccountable" TEXT,
    "cpfAccountable" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "accountables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cepsi_inserts" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "forwarding_agency" TEXT NOT NULL,
    "forwarding_professional" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "looked_for_another_service" BOOLEAN NOT NULL,
    "name_another_service" TEXT NOT NULL,
    "lenght_of_stay_in_months" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "cepsi_inserts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT,

    CONSTRAINT "charts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adresses_patientId_key" ON "adresses"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "accountables_patientId_key" ON "accountables"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "cepsi_inserts_patientId_key" ON "cepsi_inserts"("patientId");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_Owner_id_fkey" FOREIGN KEY ("Owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountables" ADD CONSTRAINT "accountables_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cepsi_inserts" ADD CONSTRAINT "cepsi_inserts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charts" ADD CONSTRAINT "charts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
