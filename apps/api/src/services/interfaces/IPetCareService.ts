import { PetCareRequest } from '@/types/PetCareRequest';

export type ICreatePetCareRequestDTO = Pick<
  PetCareRequest,
  | 'ownerId'
  | 'petId'
  | 'locationId'
  | 'title'
  | 'amount'
  | 'description'
  | 'startDate'
  | 'endDate'
  | 'questions'
> & { userId: string };

export type IUpdatePetCareRequestDTO = Partial<
  Pick<
    PetCareRequest,
    | 'ownerId'
    | 'petId'
    | 'locationId'
    | 'title'
    | 'amount'
    | 'description'
    | 'startDate'
    | 'endDate'
    | 'questions'
  >
> & { id: string; userId: string };

export type IGetPetCareRequestByIdDTO = {
  id: string;
};

export type IDeletePetCareRequestDTO = {
  id: string;
  userId: string;
};

export type IListPetCareRequestsQueryDTO = Partial<{
  status: string;
  userId: string;
}>;

export interface IPetCareService {
  createPetCareRequest(
    data: ICreatePetCareRequestDTO,
  ): Promise<{ petCareRequest: PetCareRequest }>;
  updatePetCareRequest(
    data: IUpdatePetCareRequestDTO,
  ): Promise<{ petCareRequest: PetCareRequest }>;
  getPetCareRequestById(
    data: IGetPetCareRequestByIdDTO,
  ): Promise<{ petCareRequest: PetCareRequest | null }>;
  deletePetCareRequest(data: IDeletePetCareRequestDTO): Promise<void>;
  listPetCareRequests(
    query?: IListPetCareRequestsQueryDTO,
  ): Promise<{ petCareRequests: PetCareRequest[] }>;
}
