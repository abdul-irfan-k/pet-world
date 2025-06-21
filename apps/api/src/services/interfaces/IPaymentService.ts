import type { Stripe } from 'stripe';

export type ICraeteStripeAccountDTO = {
  userId: string;
};
export type ICreateStripeAccountLinkDTO = {
  accountId: string;
  origin: string | undefined;
};

export type IOnboardStripeAccountDTO = {
  userId: string;
  origin: string | undefined;
};
export interface IGetStripeAccountDTO {
  userId: string;
}

export interface IPaymentService {
  createStripeAccount(data: ICraeteStripeAccountDTO): Promise<{ stripeAccount: Stripe.Response<Stripe.Account> }>;
  createStripeAccountLink(
    data: ICreateStripeAccountLinkDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }>;
  onboardStripeAccount(
    data: IOnboardStripeAccountDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }>;
  getSTripeAccount(data: IGetStripeAccountDTO): Promise<{ stripeAccount: Stripe.Response<Stripe.Account> }>;
}
