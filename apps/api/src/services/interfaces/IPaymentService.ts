import type { Stripe } from 'stripe';

// --- Stripe Account ---
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

// --- Pet Care Payment ---
export type IInitiatePetCarePaymentDTO = {
  userId: string;
  petCareRequestId: string;
  petCareProposalId: string;
};

// --- Earnings ---
export type IGetEarningsDTO = {
  userId: string;
};

export interface IPaymentService {
  /// --- Stripe Account ---
  createStripeAccount(data: ICraeteStripeAccountDTO): Promise<{ stripeAccount: Stripe.Response<Stripe.Account> }>;
  createStripeAccountLink(
    data: ICreateStripeAccountLinkDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }>;
  onboardStripeAccount(
    data: IOnboardStripeAccountDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }>;
  getSTripeAccount(data: IGetStripeAccountDTO): Promise<{ accounts: Stripe.Response<Stripe.Account>[] }>;

  /// --- Pet Care Payment ---
  initiatePetCarePayment(
    data: IInitiatePetCarePaymentDTO,
  ): Promise<{ paymentIntentClientSecret: string | null; petCareProposal: any; petCareRequestId: string }>;

  /// --- Earnings ---
  getEarnings(data: IGetEarningsDTO): Promise<{
    totalEarnings: number;
    inProgressEarnings: number;
    earningsByPeriod: {
      period: string;
      earnings: number;
    }[];
  }>;

  /// --- Webhooks ---
  handlePaymentSucceededWebhook(paymentIntent: Stripe.PaymentIntent): Promise<{ isUpdated: boolean }>;
}
