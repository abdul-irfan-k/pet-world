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
export type IGetStripeAccountDTO = {
  userId: string;
};

export type IInitiatePetCarePaymentDTO = {
  userId: string;
  petCareRequestId: string;
  petCareProposalId: string;
};

export type IGetEarningsDTO = {
  userId: string;
};

export interface IPaymentService {
  createStripeAccount(data: ICraeteStripeAccountDTO): Promise<{ stripeAccount: Stripe.Response<Stripe.Account> }>;
  createStripeAccountLink(
    data: ICreateStripeAccountLinkDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }>;
  onboardStripeAccount(
    data: IOnboardStripeAccountDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }>;
  getSTripeAccount(data: IGetStripeAccountDTO): Promise<{ accounts: Stripe.Response<Stripe.Account>[] }>;

  initiatePetCarePayment(
    data: IInitiatePetCarePaymentDTO,
  ): Promise<{ paymentIntentClientSecret: string | null; petCareProposal: any; petCareRequestId: string }>;
  getEarnings(data: IGetEarningsDTO): Promise<{ totalEarnings: number; inProgressEarnings: number }>;

  handlePaymentSucceededWebhook(paymentIntent: Stripe.PaymentIntent): Promise<{ isUpdated: boolean }>;
}
