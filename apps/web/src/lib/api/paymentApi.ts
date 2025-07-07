import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Stripe } from 'stripe';

import { apiClient } from '../api-client';

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

type OnboardStripeAccountResponse = ApiResponse<{
  stripeAccountLink: Stripe.Response<Stripe.AccountLink>;
}>;

type IOnboardStripeAccountInput = {
  origin: string | undefined;
};

type OnboardStripeMutationOptions<TVariables> = UseMutationOptions<
  OnboardStripeAccountResponse,
  AxiosError,
  TVariables
>;

const onboardStripeAccount = async (data: IOnboardStripeAccountInput): Promise<OnboardStripeAccountResponse> => {
  const { data: responseData } = await apiClient.post('/payments/stripe/onboard', data);
  return responseData;
};

export const useOnboardStripeAccountMutation = (options?: OnboardStripeMutationOptions<IOnboardStripeAccountInput>) => {
  return useMutation<OnboardStripeAccountResponse, AxiosError, IOnboardStripeAccountInput>({
    mutationFn: onboardStripeAccount,
    onSuccess: ({ data: { stripeAccountLink } }) => {
      window.location.href = stripeAccountLink.url;
    },
    ...options,
  });
};

const getStripeAccount = async (): Promise<ApiResponse<{ accounts: Stripe.Account[] }>> => {
  const { data } = await apiClient.get('/payments/stripe/accounts');
  return data;
};

export const useGetStripeAccountQuery = () => {
  return useQuery<ApiResponse<{ accounts: Stripe.Account[] }>, AxiosError>({
    queryKey: ['stripe-accounts'],
    queryFn: getStripeAccount,
  });
};

type EarningResponse = ApiResponse<{
  totalEarnings: number;
  inProgressEarnings: number;
  earningsByPeriod: {
    period: string;
    earnings: number;
  }[];
}>;
const getEarnings = async (): Promise<EarningResponse> => {
  const { data } = await apiClient.get('/payments/earnings/me');
  return data;
};

export const useGetEarningsQuery = () => {
  return useQuery<EarningResponse, AxiosError>({
    queryKey: ['earnings'],
    queryFn: getEarnings,
  });
};
