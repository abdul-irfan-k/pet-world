import { PetCareProposal } from 'generated/prisma';

import { PetCare } from './PetCare';
import { User } from './User';

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

export type FavoritePet = {
  id: string;
  userId: string;
  petId: string;
  createdAt: Date;
};

export type PetAdopter = {
  id: string;
  userId: string;
  adharNumber?: string | null;
  documents?: Record<string, unknown> | null;
  yearOfExperience?: number | null;
  certifications: string[];
  overview?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  proposals: PetCareProposal[];
  petCare: PetCare[];
};
