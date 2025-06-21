/*
  Warnings:

  - You are about to drop the column `pet_AdopterId` on the `PetCare` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `PetCare` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetCare" DROP CONSTRAINT "PetCare_adopterId_fkey";

-- DropForeignKey
ALTER TABLE "PetCare" DROP CONSTRAINT "PetCare_pet_AdopterId_fkey";

-- AlterTable
ALTER TABLE "PetCare" DROP COLUMN "pet_AdopterId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet_Adopter" ALTER COLUMN "certifications" SET DEFAULT ARRAY[]::TEXT[];

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_adopterId_fkey" FOREIGN KEY ("adopterId") REFERENCES "Pet_Adopter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
