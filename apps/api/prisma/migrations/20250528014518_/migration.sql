/*
  Warnings:

  - You are about to drop the `Pet_Adopter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetCare" DROP CONSTRAINT "PetCare_adopterId_fkey";

-- DropForeignKey
ALTER TABLE "PetCareProposal" DROP CONSTRAINT "PetCareProposal_adopterId_fkey";

-- DropForeignKey
ALTER TABLE "Pet_Adopter" DROP CONSTRAINT "Pet_Adopter_userId_fkey";

-- DropTable
DROP TABLE "Pet_Adopter";

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_adopterId_fkey" FOREIGN KEY ("adopterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCareProposal" ADD CONSTRAINT "PetCareProposal_adopterId_fkey" FOREIGN KEY ("adopterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
