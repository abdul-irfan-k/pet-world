/*
  Warnings:

  - You are about to drop the `Pet_Adoption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet_Adoption_Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_adoptionId_fkey";

-- DropForeignKey
ALTER TABLE "Pet_Adoption" DROP CONSTRAINT "Pet_Adoption_adopterId_fkey";

-- DropForeignKey
ALTER TABLE "Pet_Adoption" DROP CONSTRAINT "Pet_Adoption_petId_fkey";

-- DropForeignKey
ALTER TABLE "Pet_Adoption_Request" DROP CONSTRAINT "Pet_Adoption_Request_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Pet_Adoption_Request" DROP CONSTRAINT "Pet_Adoption_Request_petId_fkey";

-- DropForeignKey
ALTER TABLE "Pet_Adoption_Request" DROP CONSTRAINT "Pet_Adoption_Request_userId_fkey";

-- DropTable
DROP TABLE "Pet_Adoption";

-- DropTable
DROP TABLE "Pet_Adoption_Request";

-- CreateTable
CREATE TABLE "PetCareRequest" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "questions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetCareRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetCareProposal" (
    "id" TEXT NOT NULL,
    "petCareRequestId" TEXT NOT NULL,
    "adopterId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "proposedFee" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetCareProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetCare" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "adopterId" TEXT NOT NULL,
    "petCareRequestId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetCare_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetCareRequest" ADD CONSTRAINT "PetCareRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCareRequest" ADD CONSTRAINT "PetCareRequest_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCareRequest" ADD CONSTRAINT "PetCareRequest_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_adoptionId_fkey" FOREIGN KEY ("adoptionId") REFERENCES "PetCare"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCareProposal" ADD CONSTRAINT "PetCareProposal_petCareRequestId_fkey" FOREIGN KEY ("petCareRequestId") REFERENCES "PetCareRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCareProposal" ADD CONSTRAINT "PetCareProposal_adopterId_fkey" FOREIGN KEY ("adopterId") REFERENCES "Pet_Adopter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_adopterId_fkey" FOREIGN KEY ("adopterId") REFERENCES "Pet_Adopter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_petCareRequestId_fkey" FOREIGN KEY ("petCareRequestId") REFERENCES "PetCareRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
