export interface PetCareRequest {
  id: string;
  ownerId: string;
  petId: string;
  locationId: string;
  title: string;
  amount: string;
  description: string;
  startDate: Date;
  endDate: Date;
  questions?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
