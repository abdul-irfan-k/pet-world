import { useMutation, useQuery } from '@tanstack/react-query';

import { apiClient } from '../api-client';

import type { SignInInput, SignUpInput } from '../schemas';

const signIn = async (credentials: SignInInput) => {
  const { data } = await apiClient.post('/auth/signin', credentials);
  return data;
};

export const signInMutation = () => {
  return useMutation({ mutationFn: signIn });
};
const signup = async (credentials: SignUpInput) => {
  const { data } = await apiClient.post('/auth/signup', credentials);
  return data;
};

export const signUpMutation = () => {
  return useMutation({ mutationFn: signup });
};

const logout = async () => {
  const { data } = await apiClient.post('/auth/logout');
  return data;
};

export const logoutMutation = () => {
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
