import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../api-client';

import type { SignInInput, SignUpInput } from '../schemas';

import { User } from '@/types/User';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type AuthResponse = ApiResponse<{ user: User }>;

type AuthMutationOptions<TVariables> = UseMutationOptions<
  ApiResponse<{ user: User }>,
  AxiosError,
  TVariables
>;

const signIn = async (credentials: SignInInput): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/signin', credentials);
  return data;
};

export const useSignInMutation = (
  option?: AuthMutationOptions<SignInInput>,
) => {
  return useMutation<AuthResponse, AxiosError, SignInInput>({
    mutationFn: signIn,
    ...option,
    onMutate: () => {
      return {
        meta: {
          notify: true,
        },
      };
    },
  });
};

const signup = async (credentials: SignUpInput): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/signup', credentials);
  return data;
};

export const useSignUpMutation = (
  option?: AuthMutationOptions<SignUpInput>,
) => {
  return useMutation<AuthResponse, AxiosError, SignUpInput>({
    mutationFn: signup,
    ...option,
    onMutate: () => {
      return {
        meta: {
          notify: true,
        },
      };
    },
  });
};

const logout = async () => {
  const { data } = await apiClient.post('/auth/logout');
  return data;
};

export const useLogoutMutation = (option?: AuthMutationOptions<undefined>) => {
  return useMutation({ mutationFn: logout, ...option });
};

const fetchCurrentUser = async (): Promise<AuthResponse> => {
  const { data } = await apiClient.get('/auth/me');
  return data;
};

export const useCurrentUserQuery = () => {
  return useQuery<AuthResponse>({
    queryFn: fetchCurrentUser,
    queryKey: ['currentUser'],
    retry: 2,
  });
};
