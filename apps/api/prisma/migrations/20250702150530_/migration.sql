-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "isTransferred" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeTransferId" TEXT,
ADD COLUMN     "transferDate" TIMESTAMP(3);
