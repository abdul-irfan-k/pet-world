import type {
  IPaymentService,
  ICreateStripeAccountLinkDTO,
  ICraeteStripeAccountDTO,
  IOnboardStripeAccountDTO,
  IGetStripeAccountDTO,
  IInitiatePetCarePaymentDTO,
} from './interfaces/IPaymentService';
import type { Stripe } from 'stripe';

import { prisma, stripe } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { HttpError } from '@/utils';

export class PaymentService implements IPaymentService {
  async createStripeAccount(
    data: ICraeteStripeAccountDTO,
  ): Promise<{ stripeAccount: Stripe.Response<Stripe.Account> }> {
    const { userId } = data;

    const user = await prisma.user.findUnique({
      where: { id: userId, isDeleted: false },
      include: {
        locations: { where: { isDefault: true, isDeleted: false } },
      },
    });

    if (!user) {
      throw new HttpError({
        message: 'User not found',
        statusCode: HttpStatusCode.NOT_FOUND,
      });
    }

    const [firstName, lastName = ''] = user.name.split(' ');
    const account = await stripe.accounts.create({
      email: user.email,
      business_type: 'individual',
      individual: {
        first_name: firstName,
        last_name: lastName,
        phone: user.phone || undefined,
        email: user.email,
      },
      country: 'US',
    });

    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: account.id },
    });

    return { stripeAccount: account };
  }

  async createStripeAccountLink(
    data: ICreateStripeAccountLinkDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }> {
    const accountLink = await stripe.accountLinks.create({
      account: data.accountId,
      return_url: `${data.origin}/return/${data.accountId}`,
      refresh_url: `${data.origin}/refresh/${data.accountId}`,
      type: 'account_onboarding',
    });

    return { stripeAccountLink: accountLink };
  }

  async onboardStripeAccount(
    data: IOnboardStripeAccountDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }> {
    const { userId, origin } = data;

    const user = await prisma.user.findUnique({
      where: { id: userId, isDeleted: false },
    });

    let accountId: string;

    if (user?.stripeCustomerId) {
      accountId = user.stripeCustomerId;
    } else {
      const account = await this.createStripeAccount({ userId });
      accountId = account.stripeAccount.id;
    }

    const { stripeAccountLink } = await this.createStripeAccountLink({
      accountId,
      origin,
    });

    return { stripeAccountLink };
  }

  async getSTripeAccount(data: IGetStripeAccountDTO): Promise<{ accounts: Stripe.Response<Stripe.Account>[] }> {
    const { userId } = data;

    const user = await prisma.user.findUnique({
      where: { id: userId, isDeleted: false },
    });

    if (!user?.stripeCustomerId) {
      throw new HttpError({
        message: 'Stripe account not found',
        statusCode: HttpStatusCode.NOT_FOUND,
      });
    }

    const account = await stripe.accounts.retrieve(user.stripeCustomerId);
    return { accounts: [account] };
  }

  async handlePaymentSucceededWebhook(data: Stripe.PaymentIntent): Promise<{ isUpdated: boolean }> {
    const paymentIntentId = data.id;
    const transactionType = data.metadata.platform_transaction_type;

    const updateResult = await prisma.payment.updateMany({
      where: { stripePaymentIntentId: paymentIntentId },
      data: { paymentStatus: 'paid' },
    });

    if (updateResult.count === 0) {
      throw new HttpError({
        message: 'Payment not found',
        statusCode: HttpStatusCode.NOT_FOUND,
      });
    }

    if (transactionType === 'pet_care_payment') {
      const existingPayment = await prisma.payment.findFirst({
        where: { stripePaymentIntentId: paymentIntentId },
      });

      if (!existingPayment) {
        throw new HttpError({
          message: 'Payment not found after update',
          statusCode: HttpStatusCode.NOT_FOUND,
        });
      }

      const { care_request_id, pet_owner_user_id, pet_adopter_user_id } = data.metadata;

      const existingPetCare = await prisma.petCare.findFirst({
        where: { petCareRequestId: care_request_id, adopterId: pet_adopter_user_id },
      });

      const petCareRequest = await prisma.petCareRequest.findUnique({
        where: { id: care_request_id },
      });

      if (!petCareRequest) {
        throw new HttpError({
          message: 'Pet care request not found',
          statusCode: HttpStatusCode.NOT_FOUND,
        });
      }

      const adopter = await prisma.pet_Adopter.findUnique({
        where: { userId: pet_adopter_user_id },
      });

      if (!adopter) {
        throw new HttpError({
          message: 'Adopter not found',
          statusCode: HttpStatusCode.NOT_FOUND,
        });
      }

      if (!existingPetCare) {
        const newPetCare = await prisma.petCare.create({
          data: {
            petId: petCareRequest.petId,
            petCareRequestId: care_request_id,
            adopterId: adopter.id,
            startedAt: petCareRequest.startDate || new Date(),
            endedAt: petCareRequest.endDate || new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
            ownerId: pet_owner_user_id,
            isCompleted: false,
            paymentStatus: 'paid',
          },
        });

        await prisma.payment.update({
          where: { id: existingPayment.id },
          data: { adoptionId: newPetCare.id },
        });
      }
    }

    return { isUpdated: true };
  }

  public async initiatePetCarePayment(
    data: IInitiatePetCarePaymentDTO,
  ): Promise<{ paymentIntentClientSecret: string | null; petCareProposal: any; petCareRequestId: string }> {
    const { userId, petCareRequestId, petCareProposalId } = data;

    const petCareRequest = await prisma.petCareRequest.findFirst({ where: { id: petCareRequestId } });

    if (!petCareRequest) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_REQUEST_NOT_FOUND,
      });
    }

    if (petCareRequest.ownerId !== userId) {
      throw new HttpError({
        statusCode: HttpStatusCode.FORBIDDEN,
        message: ResponseMessages.UNAUTHORIZED,
      });
    }

    const petCareProposal = await prisma.petCareProposal.findFirst({ where: { id: petCareProposalId } });
    if (!petCareProposal) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.PET_CARE_PROPOSAL_NOT_FOUND,
      });
    }

    const adopter = await prisma.user.findUnique({
      where: { id: petCareProposal.adopterId },
    });

    if (!adopter?.stripeCustomerId) {
      throw new HttpError({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: 'Adopter does not have a Stripe connected account',
      });
    }

    const proposedFee = petCareProposal?.proposedFee;
    const platformFee = Math.round(proposedFee * 0.03);
    const requestId = petCareRequest.id;
    const petOwnerId = petCareRequest.ownerId;
    const adopterId = petCareProposal.adopterId;
    const transactionNumber = `TXN_${Date.now()}`;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: proposedFee,
      currency: 'usd',
      capture_method: 'automatic',
      transfer_group: `care_request_${petCareRequestId}_${userId}_${adopter.id}`,
      metadata: {
        platform_transaction_type: 'pet_care_payment',
        care_request_id: requestId,
        pet_owner_user_id: petOwnerId,
        pet_adopter_user_id: adopterId,
      },
    });

    await prisma.payment.create({
      data: {
        userId: petOwnerId,
        receiverId: adopterId,
        transactionNumber,
        isDonation: false,
        platformFee,
        totalPaid: proposedFee,
        currency: 'usd',
        stripePaymentIntentId: paymentIntent.id,
        paymentStatus: 'pending',
      },
    });

    return {
      paymentIntentClientSecret: paymentIntent.client_secret,
      petCareProposal: {
        ...petCareProposal,
        proposedFee,
      },
      petCareRequestId: petCareRequest.id,
    };
  }
}
