import type { Admin } from '@/types/Admin';
import type { PetAdopter } from '@/types/User';

export type ILoginAdminDTO = Pick<Admin, 'email' | 'password'>;
export interface ILoginAdminResponse {
  token: string;
  admin: Omit<Admin, 'password'>;
}

export interface IGetAdminProfileResponse {
  admin: Omit<Admin, 'password'> | null;
}

export interface IGetAllAdoptersResponse {
  adopters: PetAdopter[];
}

export interface IGetAdopterByIdResponse {
  adopter: PetAdopter | null;
}

export type IVerifyAdopterDocumentsDTO = {
  adopterId: PetAdopter['id'];
  verified: boolean;
};
export interface IVerifyAdopterDocumentsResponse {
  adopter: PetAdopter;
}

export type IUpdateAdopterDetailsDTO = Partial<
  Omit<PetAdopter, 'createdAt' | 'updatedAt'>
> & {
  id: PetAdopter['id'];
};
export interface IUpdateAdopterDetailsResponse {
  adopter: PetAdopter;
}

export type IDeleteAdopterDTO = {
  adopterId: PetAdopter['id'];
};

export interface IAdminService {
  login(data: ILoginAdminDTO): Promise<ILoginAdminResponse>;
  logout(adminId: string | undefined): Promise<void>;
  getAdminProfile(adminId: string): Promise<IGetAdminProfileResponse>;
  getAllAdopters(): Promise<IGetAllAdoptersResponse>;
  getAdopterById(adopterId: string): Promise<IGetAdopterByIdResponse>;
  verifyAdopterDocuments(
    data: IVerifyAdopterDocumentsDTO,
  ): Promise<IVerifyAdopterDocumentsResponse>;
  updateAdopterDetails(
    data: IUpdateAdopterDetailsDTO,
  ): Promise<IUpdateAdopterDetailsResponse>;
  deleteAdopter(data: IDeleteAdopterDTO): Promise<void>;

  // Pet management
  getAllPets(queryParams: any): Promise<any>; // Replace 'any' with specific DTO/Response types
  getPetById(petId: string): Promise<any>; // Replace 'any' with specific DTO/Response types
  deletePet(petId: string): Promise<void>;
  updatePetStatus(petId: string, statusData: any): Promise<any>; // Replace 'any' with specific DTO/Response types

  // Adoption request management
  getAllAdoptionRequests(queryParams: any): Promise<any>; // Replace 'any' with specific DTO/Response types
  getAdoptionRequestById(requestId: string): Promise<any>; // Replace 'any' with specific DTO/Response types
  deleteAdoptionRequest(requestId: string): Promise<void>;
}
