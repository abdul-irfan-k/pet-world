import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';
import { IAddAddressInput, IUpdateAddressInput } from '../schemas/userSchema';

import { Location } from '@/types/Location';
import { PetAdopterProfile } from '@/types/PetAdopter';
import { PetAdopter } from '@/types/User';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type AddressResponse = ApiResponse<{ location: Location }>;
type AddressesResponse = ApiResponse<{ locations: Location[] }>;
type PetAdopterProfileResponse = ApiResponse<{ petAdopter: PetAdopter }>;

type AddressMutationOptions<TData, TVariables> = UseMutationOptions<TData, AxiosError, TVariables>;

const createAddress = async (addressData: IAddAddressInput): Promise<AddressResponse> => {
  const { data } = await apiClient.post('/users/addresses', addressData);
  return data;
};

export const useCreateAddressMutation = (options?: AddressMutationOptions<AddressResponse, IAddAddressInput>) => {
  return useMutation<AddressResponse, AxiosError, IAddAddressInput>({
    mutationFn: createAddress,
    ...options,
  });
};

const updateAddress = async ({
  id,
  ...addressData
}: IUpdateAddressInput & { id: string }): Promise<AddressResponse> => {
  const { data } = await apiClient.put(`/users/addresses/${id}`, addressData);
  return data;
};

export const useUpdateAddressMutation = (
  options?: AddressMutationOptions<AddressResponse, IUpdateAddressInput & { id: string }>,
) => {
  return useMutation<AddressResponse, AxiosError, IUpdateAddressInput & { id: string }>({
    mutationFn: updateAddress,
    ...options,
  });
};

const getUserAddresses = async (): Promise<AddressesResponse> => {
  const { data } = await apiClient.get('/users/addresses');
  return data;
};

export const useGetUserAddressesQuery = (
  options?: UseQueryOptions<AddressesResponse, AxiosError, AddressesResponse>,
) => {
  return useQuery<AddressesResponse, AxiosError, AddressesResponse>({
    queryKey: ['userAddresses'],
    queryFn: getUserAddresses,
    ...options,
  });
};

const getAddressById = async (id: string): Promise<AddressResponse> => {
  const { data } = await apiClient.get(`/users/addresses/${id}`);
  return data;
};

export const useGetAddressByIdQuery = (
  id: string,
  options?: UseQueryOptions<AddressResponse, AxiosError, AddressResponse>,
) => {
  return useQuery<AddressResponse, AxiosError, AddressResponse>({
    queryKey: ['userAddress', id],
    queryFn: () => getAddressById(id),
    enabled: !!id,
    ...options,
  });
};

export type CreatePetAdopterProfileResponse = ApiResponse<{ petAdopter: PetAdopterProfile }>;

const createPetAdopterProfile = async (profileData: object): Promise<CreatePetAdopterProfileResponse> => {
  const { data } = await apiClient.post('/users/pet-adopter-profile', profileData);
  return data;
};

export const useCreatePetAdopterProfileMutation = (
  options?: AddressMutationOptions<CreatePetAdopterProfileResponse, object>,
) => {
  return useMutation<CreatePetAdopterProfileResponse, AxiosError, object>({
    mutationFn: createPetAdopterProfile,
    ...options,
  });
};

const getPetAdopterProfileStatus = async () => {
  const { data } = await apiClient.get('/users/pet-adopter-profile/status');
  return data;
};

export const useGetPetAdopterProfileStatusQuery = () => {
  return useQuery<PetAdopterProfileResponse, AxiosError, PetAdopterProfileResponse>({
    queryKey: ['petAdopterProfile'],
    queryFn: getPetAdopterProfileStatus,
  });
};

const getPetAdopterPublicProfile = async (id: string): Promise<PetAdopterProfileResponse> => {
  const { data } = await apiClient.get(`/users/pet-adopter-profile/${id}`);
  return data;
};

export const useGetPetAdopterPublicProfileQuery = (
  id: string,
  options?: UseQueryOptions<PetAdopterProfileResponse, AxiosError, PetAdopterProfileResponse>,
) => {
  return useQuery<PetAdopterProfileResponse, AxiosError, PetAdopterProfileResponse>({
    queryKey: ['petAdopterProfile', id],
    queryFn: () => getPetAdopterPublicProfile(id),
    enabled: !!id,
    ...options,
  });
};

const getMyPetAdopterProfile = async (): Promise<PetAdopterProfileResponse> => {
  const { data } = await apiClient.get('/users/pet-adopter-profile/me');
  return data;
};

export const useGetMyPetAdopterProfileQuery = (
  options?: UseQueryOptions<PetAdopterProfileResponse, AxiosError, PetAdopterProfileResponse>,
) => {
  return useQuery<PetAdopterProfileResponse, AxiosError, PetAdopterProfileResponse>({
    queryKey: ['myPetAdopterProfile'],
    queryFn: getMyPetAdopterProfile,
    ...options,
  });
};

const updatePetAdopterProfile = async (profileData: object): Promise<CreatePetAdopterProfileResponse> => {
  const { data } = await apiClient.put('/users/pet-adopter-profile', profileData);
  return data;
};

export const useUpdatePetAdopterProfileMutation = (
  options?: AddressMutationOptions<CreatePetAdopterProfileResponse, object>,
) => {
  return useMutation<CreatePetAdopterProfileResponse, AxiosError, object>({
    mutationFn: updatePetAdopterProfile,
    ...options,
  });
};
