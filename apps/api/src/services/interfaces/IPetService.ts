import { Pet, FavoritePet } from '@/types/Pet';

export type ICreatePetDTO = Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>;

export type IUpdatePetDTO = Partial<Omit<Pet, 'createdAt' | 'updatedAt'>> & {
  id: string;
};

export type IGetPetByIdDTO = Pick<Pet, 'id'>;

export type IDeletePetDTO = Pick<Pet, 'id' | 'ownerId'>;

export type IGetPetsQueryDTO = Partial<{
  species: string;
  breed: string;
  ageRange: [number, number];
  userId: string;
}>;

export type IAddPetToFavoritesDTO = Pick<FavoritePet, 'petId' | 'userId'>;

export type IRemovePetFromFavoritesDTO = Pick<FavoritePet, 'petId' | 'userId'>;

export type IGetFavoritePetsByUserIdDTO = Pick<FavoritePet, 'userId'>;

export type IIsPetFavoritedByUserDTO = Pick<FavoritePet, 'userId' | 'petId'>;

export type IGetAdoptionRequestedPetsDTO = {
  skip?: number;
  take?: number;
  adoptionStartDate?: Date;
  adoptionEndDate?: Date;
  species?: string;
  breed?: string;
  ageRange?: [number, number];
};
export interface IPetService {
  createPet(data: ICreatePetDTO): Promise<{ pet: Pet }>;
  updatePet(data: IUpdatePetDTO): Promise<{ pet: Pet }>;
  getPetById(data: IGetPetByIdDTO): Promise<{ pet: Pet | null }>;
  deletePet(data: IDeletePetDTO): Promise<void>;
  listPets(query?: IGetPetsQueryDTO): Promise<{ pets: Pet[] }>;
  getMyPets(ownerId: string): Promise<{ pets: Pet[] }>;
  addPetToFavorites(data: IAddPetToFavoritesDTO): Promise<{ pet: FavoritePet }>;
  removePetFromFavorites(data: IRemovePetFromFavoritesDTO): Promise<void>;
  getFavoritePetsByUserId(data: IGetFavoritePetsByUserIdDTO): Promise<{ pets: Pet[] }>;
  isPetFavoritedByUser(data: IIsPetFavoritedByUserDTO): Promise<{ isFavorited: { status: boolean } }>;
  getAdoptionRequestedPets(args: IGetAdoptionRequestedPetsDTO): Promise<{ petCareRequests: any }>;
}
