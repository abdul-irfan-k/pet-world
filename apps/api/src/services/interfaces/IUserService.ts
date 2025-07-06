import type { Location } from '@/types/Location';

import { PetAdopter, User } from '@/types/User';

export type ICheckUserNameExistsDTO = Pick<User, 'userName'>;

export type ICreateAddressDTO = Omit<Location, 'id' | 'createdAt' | 'updatedAt'>;

export type IUpdateAddressDTO = Partial<Omit<Location, 'createdAt' | 'updatedAt'>> & { id: string; userId: string };

export type IGetAddressByIdDTO = Pick<Location, 'id' | 'userId'>;

export type IDeleteAddressDTO = Pick<Location, 'id' | 'userId'>;

export type IGetAddressesByUserIdDTO = Pick<Location, 'userId'>;

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
  checkUserNameExists(username: ICheckUserNameExistsDTO): Promise<{ exists: boolean; availableUsername?: string }>;
  addAddress(data: ICreateAddressDTO): Promise<{ location: Location }>;
  getAddressesByUserId(data: IGetAddressesByUserIdDTO): Promise<{ locations: Location[] }>;
  getAddressById(data: IGetAddressByIdDTO): Promise<{ location: Location | null }>;
  updateAddress(data: IUpdateAddressDTO): Promise<{ location: Location | null }>;
  deleteAddress(data: IDeleteAddressDTO): Promise<{ location: Location | null }>;

  createPetAdopterProfile(userId: ICreatePetAdopterProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
  updatePetAdopterProfile(data: IUpdatePetAdopterProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
  getPetAdopterProfileStatus(data: IGetPetAdopterProfileStatusDTO): Promise<{ exists: boolean }>;
  getPetAdopterProfile(data: IGetPetAdopterPublicProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
  getPetAdopterPublicProfile(data: IGetPetAdopterPublicProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
}
