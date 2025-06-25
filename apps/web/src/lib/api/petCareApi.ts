import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';
import { IAddPetCareProposalInput } from '../schemas';

import { PetCareRequest } from '@/types/PetCare';

export interface Proposal {
  id: string;
  proposerName: string;
  message: string;
  status?: string;
}

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type PetCareResponse = ApiResponse<{ petCareRequest: PetCareRequest }>;
type PetCareRequestResponse = ApiResponse<{ petCareRequest: PetCareRequest }>;
type PetCareProposalResponse = ApiResponse<{ proposal: Proposal }>;
type PetCareProposalsListResponse = ApiResponse<{
  petCareProposals: Proposal[];
}>;
type MyPetCareRequestsResponse = ApiResponse<{
  petCareRequests: PetCareRequest[];
}>;

type PetCareMutations<TData, TVariables> = UseMutationOptions<TData, AxiosError, TVariables>;

const fetchPetCareRequestById = async (requestId: string): Promise<PetCareRequestResponse> => {
  const { data } = await apiClient.get(`pet-care/requests/${requestId}`);
  return data;
};

export const useFetchPetCareRequestByIdQuery = (
  requestId: string,
  options?: Omit<UseQueryOptions<PetCareRequestResponse, AxiosError, PetCareRequestResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<PetCareRequestResponse, AxiosError, PetCareRequestResponse>({
    queryKey: ['petCareRequest', requestId],
    queryFn: () => fetchPetCareRequestById(requestId),
    enabled: !!requestId,
    ...options,
  });
};

const createPetCareRequest = async (petData: object): Promise<PetCareResponse> => {
  const { data } = await apiClient.post('pet-care/requests', petData);
  return data;
};

export const useCreatePetCareRequestMutation = (options?: PetCareMutations<PetCareResponse, object>) => {
  return useMutation<PetCareResponse, AxiosError, object>({
    mutationFn: createPetCareRequest,
    ...options,
  });
};

const createPetCareProposal = async (proposalData: IAddPetCareProposalInput): Promise<PetCareProposalResponse> => {
  const { data } = await apiClient.post('pet-care/proposals', proposalData);
  return data;
};

export const useCreatePetCareProposalMutation = (
  options?: PetCareMutations<PetCareProposalResponse, IAddPetCareProposalInput>,
) => {
  return useMutation<PetCareProposalResponse, AxiosError, IAddPetCareProposalInput>({
    mutationFn: createPetCareProposal,
    ...options,
  });
};

const fetchProposalsForRequest = async (requestId: string): Promise<PetCareProposalsListResponse> => {
  const { data } = await apiClient.get(`pet-care/requests/${requestId}/proposals`);
  return data;
};

export const useFetchProposalsForRequestQuery = (
  requestId: string,
  options?: Omit<
    UseQueryOptions<PetCareProposalsListResponse, AxiosError, PetCareProposalsListResponse>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<PetCareProposalsListResponse, AxiosError, PetCareProposalsListResponse>({
    queryKey: ['proposalsForRequest', requestId],
    queryFn: () => fetchProposalsForRequest(requestId),
    enabled: !!requestId,
    ...options,
  });
};

const fetchMyPetCareRequests = async (): Promise<MyPetCareRequestsResponse> => {
  const { data } = await apiClient.get('pet-care/my-requests');
  return data;
};

export const useFetchMyPetCareRequestsQuery = (
  options?: Omit<
    UseQueryOptions<MyPetCareRequestsResponse, AxiosError, MyPetCareRequestsResponse>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<MyPetCareRequestsResponse, AxiosError, MyPetCareRequestsResponse>({
    queryKey: ['myPetCareRequests'],
    queryFn: fetchMyPetCareRequests,
    ...options,
  });
};

export const approvePetCareProposal = async (proposalId: string): Promise<PetCareProposalResponse> => {
  const { data } = await apiClient.put(`pet-care/proposals/${proposalId}/approve`);
  return data;
};

export const useApprovePetCareProposalMutation = (options?: PetCareMutations<PetCareProposalResponse, string>) => {
  return useMutation<PetCareProposalResponse, AxiosError, string>({
    mutationFn: approvePetCareProposal,
    ...options,
  });
};

export const rejectPetCareProposal = async (proposalId: string): Promise<PetCareProposalResponse> => {
  const { data } = await apiClient.put(`pet-care/proposals/${proposalId}/reject`);
  return data;
};

export const useRejectPetCareProposalMutation = (options?: PetCareMutations<PetCareProposalResponse, string>) => {
  return useMutation<PetCareProposalResponse, AxiosError, string>({
    mutationFn: rejectPetCareProposal,
    ...options,
  });
};

interface InitiatePetCarePaymentInput {
  requestId: string;
  proposalId: string;
}

interface InitiatePetCarePaymentResponse {
  paymentIntentClientSecret: string;
}
export const initiatePetCarePayment = async ({
  proposalId,
  requestId,
}: InitiatePetCarePaymentInput): Promise<ApiResponse<InitiatePetCarePaymentResponse>> => {
  const { data } = await apiClient.post(`pet-care/requests/${requestId}/initiate-payment`, {
    proposalId,
  });
  return data;
};

export const useInitiatePetCarePaymentMutation = (
  options?: PetCareMutations<ApiResponse<InitiatePetCarePaymentResponse>, InitiatePetCarePaymentInput>,
) => {
  return useMutation<ApiResponse<InitiatePetCarePaymentResponse>, AxiosError, InitiatePetCarePaymentInput>({
    mutationFn: initiatePetCarePayment,
    ...options,
  });
};
