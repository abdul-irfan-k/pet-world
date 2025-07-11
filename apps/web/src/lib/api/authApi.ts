import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
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

type AuthMutationOptions<TVariables> = UseMutationOptions<ApiResponse<{ user: User }>, AxiosError, TVariables>;

const signup = async (credentials: SignUpInput): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/signup', credentials);
  return data;
};

export const useSignUpMutation = (option?: AuthMutationOptions<SignUpInput>) => {
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

const signIn = async (credentials: SignInInput): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/signin', credentials);
  return data;
};

export const useSignInMutation = (option?: AuthMutationOptions<SignInInput>) => {
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

const signInWithGoogle = async (data: { idToken: string }) => {
  const response = await apiClient.post('/auth/google-auth', data);
  return response.data;
};

export const useSignInWithGoogleMutation = (option?: AuthMutationOptions<{ idToken: string }>) => {
  return useMutation<AuthResponse, AxiosError, { idToken: string }>({
    mutationFn: signInWithGoogle,
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

export const useCurrentUserQuery = (options?: UseQueryOptions<AuthResponse, AxiosError, AuthResponse>) => {
  return useQuery({
    queryFn: fetchCurrentUser,
    queryKey: ['currentUser'],
    retry: 2,
    ...options,
  });
};

const resendVerificationEmail = async (option: { email: string }): Promise<ApiResponse<{ success: boolean }>> => {
  const { data } = await apiClient.post('/auth/verify-email/resend', { email: option.email });
  return data;
};

export const useResendVerificationEmailMutation = (
  option: UseMutationOptions<ApiResponse<{ success: boolean }>, AxiosError, { email: string }>,
) => {
  return useMutation<ApiResponse<{ success: boolean }>, AxiosError, { email: string }>({
    mutationFn: resendVerificationEmail,
    ...option,
  });
};

const verifyEmail = async (option: { email: string; code: string }): Promise<ApiResponse<{ success: boolean }>> => {
  const { data } = await apiClient.post('/auth/verify-email', { ...option });
  return data;
};

export const useVerifyEmailMutation = (
  option: UseMutationOptions<ApiResponse<{ success: boolean }>, AxiosError, { email: string; code: string }>,
) => {
  return useMutation<ApiResponse<{ success: boolean }>, AxiosError, { email: string; code: string }>({
    mutationFn: verifyEmail,
    ...option,
  });
};
