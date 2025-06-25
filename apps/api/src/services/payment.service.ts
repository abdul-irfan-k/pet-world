import type {
  IPaymentService,
  ICreateStripeAccountLinkDTO,
  ICraeteStripeAccountDTO,
  IOnboardStripeAccountDTO,
  IGetStripeAccountDTO,
} from './interfaces/IPaymentService';
import type { Stripe } from 'stripe';

import { prisma, stripe } from '@/config';
import { HttpStatusCode } from '@/constants';
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
      if (!existingPetCare) {
        const newPetCare = await prisma.petCare.create({
          data: {
            petId: petCareRequest.petId,
            petCareRequestId: care_request_id,
            adopterId: pet_adopter_user_id,
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
}
