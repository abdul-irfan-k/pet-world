import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';

import type { IAddPetInput, IUpdatePetInput } from '../schemas';

import { Pet } from '@/types/pet';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type PetResponse = ApiResponse<{ pet: Pet }>;

type PetMutationOptions<TVariables> = UseMutationOptions<
  PetResponse,
  AxiosError,
  TVariables
>;

const createPet = async (petData: IAddPetInput): Promise<PetResponse> => {
  const { data } = await apiClient.post('/pets', petData);
  return data;
};

export const useCreatePetMutation = (
  options?: PetMutationOptions<IAddPetInput>,
) => {
  return useMutation<PetResponse, AxiosError, IAddPetInput>({
    mutationFn: createPet,
    ...options,
  });
};

const updatePet = async ({
  id,
  ...petData
}: IUpdatePetInput & { id: string }): Promise<PetResponse> => {
  const { data } = await apiClient.put(`/pets/${id}`, petData);
  return data;
};

export const useUpdatePetMutation = (
  options?: PetMutationOptions<IUpdatePetInput & { id: string }>,
) => {
  return useMutation<PetResponse, AxiosError, IUpdatePetInput & { id: string }>(
    {
      mutationFn: updatePet,
      ...options,
    },
  );
};

const getPetById = async (id: string): Promise<PetResponse> => {
  const { data } = await apiClient.get(`/pets/${id}`);
  return data;
};

export const useGetPetByIdQuery = (
  id: string,
  options?: UseQueryOptions<PetResponse, AxiosError, PetResponse>,
) => {
  return useQuery<PetResponse, AxiosError, PetResponse>({
    queryKey: ['pet', id],
    queryFn: () => getPetById(id),
    enabled: !!id,
    ...options,
  });
};

const deletePet = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete(`/pets/${id}`);
  return data;
};

export const useDeletePetMutation = (
  options?: UseMutationOptions<ApiResponse<null>, AxiosError, string>,
) => {
  return useMutation<ApiResponse<null>, AxiosError, string>({
    mutationFn: deletePet,
    ...options,
  });
};
