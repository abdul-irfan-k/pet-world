import { Pet } from '@/types/Pet';

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
}>;

export interface IPetService {
  createPet(data: ICreatePetDTO): Promise<{ pet: Pet }>;
  updatePet(data: IUpdatePetDTO): Promise<{ pet: Pet }>;
  getPetById(data: IGetPetByIdDTO): Promise<{ pet: Pet | null }>;
  deletePet(data: IDeletePetDTO): Promise<void>;
  listPets(query?: IGetPetsQueryDTO): Promise<{ pets: Pet[] }>;
}
