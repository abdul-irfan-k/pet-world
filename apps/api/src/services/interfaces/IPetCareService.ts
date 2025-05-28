import { PetCareProposal } from '@/types/PetCare';
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

export type ICreatePetCareProposalDTO = Pick<
  PetCareProposal,
  'adopterId' | 'petCareRequestId' | 'message' | 'proposedFee'
>;

export type IGetPetCareProposalByIdDTO = Pick<PetCareProposal, 'id'> & {
  userId: string;
};

export type IUpdatePetCareProposalDTO = Partial<
  Pick<PetCareProposal, 'status' | 'message' | 'proposedFee'> & {
    id: string;
    userId: string;
  }
>;

export type IDeletePetCareProposalDTO = {
  id: string;
  userId: string;
};

export type IListPetCareProposalsByAdopterIdDTO = {
  adopterId: string;
};

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

  createPetCareProposal(
    data: ICreatePetCareProposalDTO,
  ): Promise<{ petCareProposal: any }>;

  getPetCareProposalById(
    data: IGetPetCareProposalByIdDTO,
  ): Promise<{ petCareProposal: any | null }>;
  updatePetCareProposal(
    data: IUpdatePetCareProposalDTO,
  ): Promise<{ petCareProposal: any }>;
  deletePetCareProposal(data: IDeletePetCareProposalDTO): Promise<void>;
  listPetCareProposalsByAdopterId(
    data: IListPetCareProposalsByAdopterIdDTO,
  ): Promise<{ petCareProposals: PetCareProposal[] }>;
  approvePetCareProposal(
    data: IGetPetCareProposalByIdDTO, // Assuming same DTO as getPetCareProposalById for now
  ): Promise<{ petCareProposal: any }>;
}
