import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';
import { IAddPetCareProposalInput } from '../schemas';

import { PetCareRequest } from '@/types/PetCare';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type PetCareResponse = ApiResponse<{ petCareRequest: PetCareRequest }>;

type PetCareProposalResponse = ApiResponse<{ proposal: unknown }>;

type PetCareMutations<TData, TVariables> = UseMutationOptions<
  TData,
  AxiosError,
  TVariables
>;

const createPetCareRequest = async (
  petData: object,
): Promise<PetCareResponse> => {
  const { data } = await apiClient.post('pet-care/requests', petData);
  return data;
};

export const useCreatePetCareRequestMutation = (
  options?: PetCareMutations<PetCareResponse, object>,
) => {
  return useMutation<PetCareResponse, AxiosError, object>({
    mutationFn: createPetCareRequest,
    ...options,
  });
};

const createPetCareProposal = async (
  proposalData: object,
): Promise<PetCareProposalResponse> => {
  const { data } = await apiClient.post('pet-care/proposals', proposalData);
  return data;
};

export const useCreatePetCareProposalMutation = (
  options?: PetCareMutations<PetCareProposalResponse, IAddPetCareProposalInput>,
) => {
  return useMutation<
    PetCareProposalResponse,
    AxiosError,
    IAddPetCareProposalInput
  >({
    mutationFn: createPetCareProposal,
    ...options,
  });
};
