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
};

export type PetAdoptionRequest = {
  id: string;
  userId: string;
  petId: string;
  locationId: string;
  status: string;
  imageUrls: string[];
  videoUrls: string[];
  address?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PetAdoption = {
  id: string;
  petId: string;
  adopterId: string;
  adoptionDate?: Date | null;
  isAlreadyAdopted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type FavoritePet = {
  id: string;
  userId: string;
  petId: string;
  createdAt: Date;
};
