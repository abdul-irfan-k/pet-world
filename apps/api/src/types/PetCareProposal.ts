export type PetCareProposal = {
  id: string;
  petCareRequestId: string;
  adopterId: string;
  message: string;
  proposedFee: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
