import type { Location } from '@/types/Location';

import { PetAdopter, User } from '@/types/User';

// --- User ---
export type ICheckUserNameExistsDTO = Pick<User, 'userName'>;
export type IUpdateUserDTO = Partial<Omit<User, 'createdAt' | 'updatedAt' | 'password'>>;

// --- Address ---
export type ICreateAddressDTO = Omit<Location, 'id' | 'createdAt' | 'updatedAt'>;

export type IUpdateAddressDTO = Partial<Omit<Location, 'createdAt' | 'updatedAt'>> & { id: string; userId: string };

export type IGetAddressByIdDTO = Pick<Location, 'id' | 'userId'>;

export type IDeleteAddressDTO = Pick<Location, 'id' | 'userId'>;

export type IGetAddressesByUserIdDTO = Pick<Location, 'userId'>;

// --- Pet Adopter Profile ---
export type ICreatePetAdopterProfileDTO = Pick<
  PetAdopter,
  'userId' | 'adharNumber' | 'documents' | 'yearOfExperience' | 'certifications' | 'overview'
>;

export type IUpdatePetAdopterProfileDTO = Partial<
  Pick<PetAdopter, 'adharNumber' | 'documents' | 'yearOfExperience' | 'certifications' | 'overview'>
> & { userId: string };

export type IGetPetAdopterProfileStatusDTO = { userId: string };

export type IGetPetAdopterPublicProfileDTO = { userId?: string; id?: string };

export interface IUserService {
  // --- User ---
  checkUserNameExists(username: ICheckUserNameExistsDTO): Promise<{ exists: boolean; availableUsername?: string }>;
  updateUser(data: IUpdateUserDTO): Promise<{ user: User | null }>;

  // --- Address ---
  addAddress(data: ICreateAddressDTO): Promise<{ location: Location }>;
  getAddressesByUserId(data: IGetAddressesByUserIdDTO): Promise<{ locations: Location[] }>;
  getAddressById(data: IGetAddressByIdDTO): Promise<{ location: Location | null }>;
  updateAddress(data: IUpdateAddressDTO): Promise<{ location: Location | null }>;
  deleteAddress(data: IDeleteAddressDTO): Promise<{ location: Location | null }>;

  // --- Pet Adopter Profile ---
  createPetAdopterProfile(userId: ICreatePetAdopterProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
  updatePetAdopterProfile(data: IUpdatePetAdopterProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
  getPetAdopterProfileStatus(data: IGetPetAdopterProfileStatusDTO): Promise<{ exists: boolean }>;
  getPetAdopterProfile(data: IGetPetAdopterPublicProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
  getPetAdopterPublicProfile(data: IGetPetAdopterPublicProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
}
