export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  rejected = 'rejected',
}

export type PetCampaigns = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  imageUrls: string[];
  videoUrls: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type AccountDetails = {
  id: string;
  campaignId: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  userId: string;
  receiverId: string;
  adoptionId?: string | null;
  transactionNumber: string;
  isDonation: boolean;
  platformFee: number;
  totalPaid: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
};
