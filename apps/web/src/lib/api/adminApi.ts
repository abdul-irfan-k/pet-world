import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';

import type { User } from '@/types/User';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type Admin = User;

type AdminAuthResponse = ApiResponse<{ admin: Admin }>;
type UsersResponse = ApiResponse<{ users: User[] }>;
//eslint-disable-next-line
type PetsResponse = ApiResponse<{ pets: any[] }>;
//eslint-disable-next-line
type PetResponse = ApiResponse<{ pet: any }>;
//eslint-disable-next-line
type AdoptionRequestsResponse = ApiResponse<{ adoptions: any[] }>;
//eslint-disable-next-line
type AdminMutationOptions<TVariables, TData = any> = UseMutationOptions<ApiResponse<TData>, AxiosError, TVariables>;

const login = async (credentials: { email: string; password: string }): Promise<AdminAuthResponse> => {
  const { data } = await apiClient.post('/admin/login', credentials);
  return data;
};

export const useAdminLoginMutation = (
  option?: AdminMutationOptions<{ email: string; password: string }, { admin: Admin }>,
) => {
  return useMutation<AdminAuthResponse, AxiosError, { email: string; password: string }>({
    mutationFn: login,
    ...option,
    onMutate: () => ({ meta: { notify: true } }),
  });
};

const logout = async () => {
  const { data } = await apiClient.post('/admin/logout');
  return data;
};

export const useAdminLogoutMutation = (option?: AdminMutationOptions<undefined>) => {
  return useMutation({ mutationFn: logout, ...option });
};

const fetchAdminProfile = async (): Promise<AdminAuthResponse> => {
  const { data } = await apiClient.get('/admin/me');
  return data;
};

export const useAdminProfileQuery = () => {
  return useQuery<AdminAuthResponse, AxiosError>({
    queryFn: fetchAdminProfile,
    queryKey: ['adminProfile'],
    retry: 2,
  });
};

const fetchAllUsers = async (): Promise<UsersResponse> => {
  const { data } = await apiClient.get('/admin/users');
  return data;
};

export const useAdminUsersQuery = () => {
  return useQuery<UsersResponse>({
    queryFn: fetchAllUsers,
    queryKey: ['adminUsers'],
    retry: 2,
  });
};

const fetchAllPets = async (): Promise<PetsResponse> => {
  const { data } = await apiClient.get('/admin/pets');
  return data;
};

export const useAdminPetsQuery = () => {
  return useQuery<PetsResponse>({
    queryFn: fetchAllPets,
    queryKey: ['adminPets'],
    retry: 2,
  });
};

const fetchPetById = async (petId: string): Promise<PetResponse> => {
  const { data } = await apiClient.get(`/admin/pets/${petId}`);
  return data;
};

export const useAdminPetByIdQuery = (petId: string) => {
  return useQuery<PetResponse>({
    queryFn: () => fetchPetById(petId),
    queryKey: ['adminPet', petId],
    enabled: !!petId,
    retry: 2,
  });
};

//eslint-disable-next-line
const deletePet = async (petId: string): Promise<any> => {
  const { data } = await apiClient.delete(`/admin/pets/${petId}`);
  return data;
};

//eslint-disable-next-line
export const useAdminDeletePetMutation = (option?: AdminMutationOptions<string, any>) => {
  //eslint-disable-next-line
  return useMutation<any, AxiosError, string>({
    mutationFn: deletePet,
    ...option,
    onMutate: () => ({ meta: { notify: true } }),
  });
};

const updatePetStatus = async ({ petId, status }: { petId: string; status: string }): Promise<PetResponse> => {
  const { data } = await apiClient.patch(`/admin/pets/${petId}/status`, { status });
  return data;
};

export const useAdminUpdatePetStatusMutation = (
  //eslint-disable-next-line
  option?: AdminMutationOptions<{ petId: string; status: string }, { pet: any }>,
) => {
  return useMutation<PetResponse, AxiosError, { petId: string; status: string }>({
    mutationFn: updatePetStatus,
    ...option,
    onMutate: () => ({ meta: { notify: true } }),
  });
};

const fetchAllAdoptionRequests = async (): Promise<AdoptionRequestsResponse> => {
  const { data } = await apiClient.get('/admin/adoptions');
  return data;
};

export const useAdminAdoptionRequestsQuery = () => {
  return useQuery<AdoptionRequestsResponse>({
    queryFn: fetchAllAdoptionRequests,
    queryKey: ['adminAdoptions'],
    retry: 2,
  });
};
