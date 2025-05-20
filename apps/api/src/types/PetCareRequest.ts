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
