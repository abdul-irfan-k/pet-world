import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';
import { IAddAddressInput, IUpdateAddressInput } from '../schemas/userSchema';

import { Location } from '@/types/Location';
import { PetAdopterProfile } from '@/types/PetAdopter';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type AddressResponse = ApiResponse<{ location: Location }>;
type AddressesResponse = ApiResponse<{ locations: Location[] }>;

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
