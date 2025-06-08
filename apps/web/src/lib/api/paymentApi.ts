import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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

const onboardStripeAccount = async (
  data: IOnboardStripeAccountInput,
): Promise<OnboardStripeAccountResponse> => {
  const { data: responseData } = await apiClient.post(
    '/payments/stripe/onboard',
    data,
  );
  return responseData;
};

export const useOnboardStripeAccountMutation = (
  options?: OnboardStripeMutationOptions<IOnboardStripeAccountInput>,
) => {
  return useMutation<
    OnboardStripeAccountResponse,
    AxiosError,
    IOnboardStripeAccountInput
  >({
    mutationFn: onboardStripeAccount,
    onSuccess: ({ data: { stripeAccountLink } }) => {
      window.location.href = stripeAccountLink.url;
    },
    ...options,
  });
};
