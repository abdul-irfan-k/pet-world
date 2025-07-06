import { Pet, FavoritePet } from '@/types/Pet';

// --- Pet ---
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

// --- Favorite Pets ---
export type IAddPetToFavoritesDTO = Pick<FavoritePet, 'petId' | 'userId'>;

export type IRemovePetFromFavoritesDTO = Pick<FavoritePet, 'petId' | 'userId'>;

export type IGetFavoritePetsByUserIdDTO = Pick<FavoritePet, 'userId'>;

export type IIsPetFavoritedByUserDTO = Pick<FavoritePet, 'userId' | 'petId'>;

// --- Adoption Requests ---
export type IGetAdoptionRequestedPetsDTO = {
  skip?: number;
  take?: number;
  adoptionStartDate?: Date;
  adoptionEndDate?: Date;
  species?: string[];
  breed?: string;
  ageRange?: [number, number];
};

export interface IPetService {
  // --- Pet ---
  createPet(data: ICreatePetDTO): Promise<{ pet: Pet }>;
  updatePet(data: IUpdatePetDTO): Promise<{ pet: Pet }>;
  getPetById(data: IGetPetByIdDTO): Promise<{ pet: Pet | null }>;
  deletePet(data: IDeletePetDTO): Promise<void>;
  listPets(query?: IGetPetsQueryDTO): Promise<{ pets: Pet[] }>;
  getMyPets(ownerId: string): Promise<{ pets: Pet[] }>;

  // --- Favorite Pets ---
  addPetToFavorites(data: IAddPetToFavoritesDTO): Promise<{ pet: FavoritePet }>;
  removePetFromFavorites(data: IRemovePetFromFavoritesDTO): Promise<void>;
  getFavoritePetsByUserId(data: IGetFavoritePetsByUserIdDTO): Promise<{ pets: Pet[] }>;
  isPetFavoritedByUser(data: IIsPetFavoritedByUserDTO): Promise<{ isFavorited: { status: boolean } }>;

  // --- Adoption Requests ---
  getAdoptionRequestedPets(args: IGetAdoptionRequestedPetsDTO): Promise<{ pets: any }>;
}
