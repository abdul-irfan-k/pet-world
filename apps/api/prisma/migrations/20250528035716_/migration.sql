-- AlterTable
ALTER TABLE "PetCare" ADD COLUMN     "pet_AdopterId" TEXT;

-- AlterTable
ALTER TABLE "PetCareProposal" ADD COLUMN     "pet_AdopterId" TEXT;

-- CreateTable
CREATE TABLE "Pet_Adopter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adharNumber" TEXT,
    "documents" JSONB,
    "yearOfExperience" INTEGER,
    "certifications" TEXT[],
    "overview" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pet_Adopter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_Adopter_userId_key" ON "Pet_Adopter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_Adopter_adharNumber_key" ON "Pet_Adopter"("adharNumber");

-- AddForeignKey
ALTER TABLE "Pet_Adopter" ADD CONSTRAINT "Pet_Adopter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_pet_AdopterId_fkey" FOREIGN KEY ("pet_AdopterId") REFERENCES "Pet_Adopter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCareProposal" ADD CONSTRAINT "PetCareProposal_pet_AdopterId_fkey" FOREIGN KEY ("pet_AdopterId") REFERENCES "Pet_Adopter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
