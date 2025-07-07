import type { Admin } from '@/types/Admin';
import type { PetAdopter, User } from '@/types/User';

// --- Auth ---
export type ILoginAdminDTO = Pick<Admin, 'email' | 'password'>;
export interface ILoginAdminResponse {
  token: string;
  admin: Omit<Admin, 'password'>;
}

/// --- Admin Profile ---
export interface IGetAdminProfileResponse {
  admin: Omit<Admin, 'password'> | null;
}

/// --- User & Adopter Management ---
export interface IGetAllAdoptersResponse {
  adopters: PetAdopter[];
}

export interface IGetAllUsersResponse {
  users: User[];
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

export type IUpdateAdopterDetailsDTO = Partial<Omit<PetAdopter, 'createdAt' | 'updatedAt'>> & {
  id: PetAdopter['id'];
};
export interface IUpdateAdopterDetailsResponse {
  adopter: PetAdopter;
}

export type IDeleteAdopterDTO = {
  adopterId: PetAdopter['id'];
};

export interface IAdminService {
  // --- Auth ---
  login(data: ILoginAdminDTO): Promise<ILoginAdminResponse>;
  logout(adminId: string | undefined): Promise<void>;

  // --- Admin Profile ---
  getAdminProfile(adminId: string): Promise<IGetAdminProfileResponse>;

  // --- User & Adopter Management ---
  getAllUsers(queryParams: any): Promise<IGetAllUsersResponse>;
  getAllAdopters(): Promise<IGetAllAdoptersResponse>;
  getAdopterById(adopterId: string): Promise<IGetAdopterByIdResponse>;
  verifyAdopterDocuments(data: IVerifyAdopterDocumentsDTO): Promise<IVerifyAdopterDocumentsResponse>;
  updateAdopterDetails(data: IUpdateAdopterDetailsDTO): Promise<IUpdateAdopterDetailsResponse>;
  deleteAdopter(data: IDeleteAdopterDTO): Promise<void>;

  // --- Pet Management ---
  getAllPets(queryParams: any): Promise<any>;
  getPetById(petId: string): Promise<any>;
  deletePet(petId: string): Promise<void>;
  updatePetStatus(petId: string, statusData: any): Promise<any>;

  // --- Adoption Requests ---
  getAllAdoptionRequests(queryParams: any): Promise<any>;
  getAdoptionRequestById(requestId: string): Promise<any>;
  deleteAdoptionRequest(requestId: string): Promise<void>;
}
