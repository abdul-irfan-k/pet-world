import { Location } from './Location';

export enum PetType {
  DOG = 'dog',
  CAT = 'cat',
  RABBIT = 'rabbit',
}
export type Pet = {
  id: string;
  name: string;
  petBiometricId?: string | null;
  species: string;
  images: string[];
  videos: string[];
  age: number;
  breed: string;
  gender: string;
  profile?: Record<string, unknown> | null;
  ownerId: string;
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
  startDate: Date;
  endDate: Date;
  questions?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PetWithAdoptionRequest = Pet & {
  adoptionRequest: {
    id: string;
    petId: string;
    ownerId: string;
    locationId: string;
    title: string;
    amount: string;
    description: string;
    startDate: Date;
    endDate: Date;
    questions?: Record<string, unknown> | null;
    createdAt: Date;
    updatedAt: Date;
    location: Pick<
      Location,
      'id' | 'name' | 'street' | 'apt' | 'city' | 'state' | 'country' | 'postcode' | 'latitude' | 'longitude'
    >;
  };
};
