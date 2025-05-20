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
