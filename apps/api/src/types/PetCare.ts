import { PaymentStatus } from './Payment';

export type PetCare = {
  id: string;
  petId: string;
  adopterId: string;
  petCareRequestId: string;
  startedAt: Date;
  endedAt: Date;
  isCompleted: boolean;
  paymentStatus: PaymentStatus;
  review?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PetCareRequest = {
  id: string;
  ownerId: string;
  petId: string;
  locationId: string;
  title: string;
  amount: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  questions?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
};

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
