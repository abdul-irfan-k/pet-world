import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
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
type PetsResponse = ApiResponse<{ pets: Pet[] }>;

type PetMutationOptions<TVariables> = UseMutationOptions<PetResponse, AxiosError, TVariables>;

const createPet = async (petData: IAddPetInput): Promise<PetResponse> => {
  const { data } = await apiClient.post('/pets', petData);
  return data;
};

export const useCreatePetMutation = (options?: PetMutationOptions<IAddPetInput>) => {
  return useMutation<PetResponse, AxiosError, IAddPetInput>({
    mutationFn: createPet,
    ...options,
  });
};

const updatePet = async ({ id, ...petData }: IUpdatePetInput & { id: string }): Promise<PetResponse> => {
  const { data } = await apiClient.put(`/pets/${id}`, petData);
  return data;
};

export const useUpdatePetMutation = (options?: PetMutationOptions<IUpdatePetInput & { id: string }>) => {
  return useMutation<PetResponse, AxiosError, IUpdatePetInput & { id: string }>({
    mutationFn: updatePet,
    ...options,
  });
};

const getMyPets = async (): Promise<PetsResponse> => {
  const { data } = await apiClient.get('/pets/my-pets');
  return data;
};

export const useGetMyPetsQuery = (options?: UseQueryOptions<PetsResponse, AxiosError, PetsResponse>) => {
  return useQuery<PetsResponse, AxiosError, PetsResponse>({
    queryKey: ['myPets'],
    queryFn: getMyPets,
    ...options,
  });
};

const getAllPets = async (): Promise<PetsResponse> => {
  const { data } = await apiClient.get('/pets');
  return data;
};

export const useGetAllPetsQuery = (options?: UseQueryOptions<PetsResponse, AxiosError, PetsResponse>) => {
  return useQuery<PetsResponse, AxiosError, PetsResponse>({
    queryKey: ['pets'],
    queryFn: getAllPets,
    ...options,
  });
};

const getPetById = async (id: string): Promise<PetResponse> => {
  const { data } = await apiClient.get(`/pets/${id}`);
  return data;
};

export const useGetPetByIdQuery = (id: string, options?: UseQueryOptions<PetResponse, AxiosError, PetResponse>) => {
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

export const useDeletePetMutation = (options?: UseMutationOptions<ApiResponse<null>, AxiosError, string>) => {
  return useMutation<ApiResponse<null>, AxiosError, string>({
    mutationFn: deletePet,
    ...options,
  });
};

const addPetToFavorites = async (petId: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post('/favorites', { petId });
  return data;
};

export const useAddPetToFavoritesMutation = (options?: UseMutationOptions<ApiResponse<null>, AxiosError, string>) => {
  return useMutation<ApiResponse<null>, AxiosError, string>({
    mutationFn: addPetToFavorites,
    ...options,
  });
};

const removePetFromFavorites = async (petId: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete(`/favorites/${petId}`);
  return data;
};

export const useRemovePetFromFavoritesMutation = (
  options?: UseMutationOptions<ApiResponse<null>, AxiosError, string>,
) => {
  return useMutation<ApiResponse<null>, AxiosError, string>({
    mutationFn: removePetFromFavorites,
    ...options,
  });
};

const getFavoritePetsByUserId = async (): Promise<PetsResponse> => {
  const { data } = await apiClient.get('/favorites');
  return data;
};

export const useGetFavoritePetsQuery = (options?: UseQueryOptions<PetsResponse, AxiosError, PetsResponse>) => {
  return useQuery<PetsResponse, AxiosError, PetsResponse>({
    queryKey: ['favoritePets'],
    queryFn: getFavoritePetsByUserId,
    ...options,
  });
};

type IsPetFavoritedResponse = ApiResponse<{ isFavorited: { status: boolean } }>;

const isPetFavoritedByUser = async (petId: string): Promise<IsPetFavoritedResponse> => {
  const { data } = await apiClient.get(`/favorites/${petId}/status`);
  return data;
};

export const useIsPetFavoritedByUserQuery = (
  petId: string,
  options?: UseQueryOptions<IsPetFavoritedResponse, AxiosError, IsPetFavoritedResponse>,
) => {
  return useQuery<IsPetFavoritedResponse, AxiosError, IsPetFavoritedResponse>({
    queryKey: ['isPetFavorited', petId],
    queryFn: () => isPetFavoritedByUser(petId),
    enabled: !!petId,
    ...options,
  });
};

type GetAdoptionRequestedPetsParams = {
  species?: string[];
  age?: number[];
  adoptionFee?: number[];
  distance?: number[];
  size?: string[];
  gender?: string[];
};

const getAdoptionRequestedPets = async (params?: GetAdoptionRequestedPetsParams): Promise<PetsResponse> => {
  const { data } = await apiClient.get('/pets/adoption-requests', { params });
  return data;
};

export const useGetAdoptionRequestedPetsQuery = (
  params?: GetAdoptionRequestedPetsParams,
  options?: UseQueryOptions<PetsResponse, AxiosError, PetsResponse>,
) => {
  return useQuery<PetsResponse, AxiosError, PetsResponse>({
    queryKey: ['adoptionRequestedPets', params],
    queryFn: () => getAdoptionRequestedPets(params),
    ...options,
  });
};
