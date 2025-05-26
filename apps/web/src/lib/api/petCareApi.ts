import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';

import { PetCareRequest } from '@/types/PetCare';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type PetCareResponse = ApiResponse<{ petCareRequest: PetCareRequest }>;

type PetCareMutations<TVariables> = UseMutationOptions<
  PetCareResponse,
  AxiosError,
  TVariables
>;

const createPetCareRequest = async (
  petData: object,
): Promise<PetCareResponse> => {
  const { data } = await apiClient.post('/pet‑care/requests', petData);
  return data;
};

export const useCreatePetCareRequestMutation = (
  options?: PetCareMutations<object>,
) => {
  return useMutation<PetCareResponse, AxiosError, object>({
    mutationFn: createPetCareRequest,
    ...options,
  });
};
