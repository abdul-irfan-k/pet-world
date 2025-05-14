import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';

import { apiClient } from '../api-client';

import type { SignInInput, SignUpInput } from '../schemas';

import { User } from '@/types/User';

interface AutheReponse {
  user: User;
  message: string;
  status: string;
}

const signIn = async (credentials: SignInInput) => {
  const { data } = await apiClient.post('/auth/signin', credentials);
  return data;
};

export const useSignInMutation = (option: MutationOptions<AutheReponse>) => {
  return useMutation({ mutationFn: signIn });
};

const signup = async (credentials: SignUpInput) => {
  const { data } = await apiClient.post('/auth/signup', credentials);
  return data;
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signup });
};

const logout = async () => {
  const { data } = await apiClient.post('/auth/logout');
  return data;
};

export const useLogoutMutation = () => {
  return useMutation({ mutationFn: logout });
};

const fetchCurrentUser = async () => {
  const { data } = await apiClient.get('/auth/me');
  return { data };
};

export const useCurrentUserQuery = () => {
  return useQuery({
    queryFn: fetchCurrentUser,
    queryKey: ['currentUser'],
  });
};
