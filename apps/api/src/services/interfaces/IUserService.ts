import type { Location } from '@/types/Location';

import { PetAdopter } from '@/types/User';

export type ICreateAddressDTO = Omit<Location, 'id' | 'createdAt' | 'updatedAt'>;

export type IUpdateAddressDTO = Partial<Omit<Location, 'createdAt' | 'updatedAt'>> & { id: string; userId: string };

export type IGetAddressByIdDTO = Pick<Location, 'id' | 'userId'>;

export type IDeleteAddressDTO = Pick<Location, 'id' | 'userId'>;

export type IGetAddressesByUserIdDTO = Pick<Location, 'userId'>;

export type ICreatePetAdopterProfileDTO = Pick<
  PetAdopter,
  'userId' | 'adharNumber' | 'documents' | 'yearOfExperience' | 'certifications' | 'overview'
>;
export interface IUserService {
  addAddress(data: ICreateAddressDTO): Promise<{ location: Location }>;
  getAddressesByUserId(data: IGetAddressesByUserIdDTO): Promise<{ locations: Location[] }>;
  getAddressById(data: IGetAddressByIdDTO): Promise<{ location: Location | null }>;
  updateAddress(data: IUpdateAddressDTO): Promise<{ location: Location | null }>;
  deleteAddress(data: IDeleteAddressDTO): Promise<{ location: Location | null }>;
  createPetAdopterProfile(userId: ICreatePetAdopterProfileDTO): Promise<{ petAdopter: PetAdopter | null }>;
}
