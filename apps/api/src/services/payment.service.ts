import {
  IPaymentService,
  ICreateStripeAccountLinkDTO,
  ICraeteStripeAccountDTO,
  IOnboardStripeAccountDTO,
} from './interfaces/IPaymentService';

import type { Stripe } from 'stripe';

import { prisma, stripe } from '@/config';
import { HttpStatusCode } from '@/constants';
import { HttpError } from '@/utils';

export class PaymentService implements IPaymentService {
  public async createStripeAccount(
    data: ICraeteStripeAccountDTO,
  ): Promise<{ stripeAccount: Stripe.Response<Stripe.Account> }> {
    try {
      const { userId } = data;

      const user = await prisma.user.findUnique({
        where: { id: userId, isDeleted: false },
        include: {
          locations: {
            where: { isDefault: true, isDeleted: false },
          },
        },
      });

      if (!user) {
        throw new HttpError({
          message: 'User not found',
          statusCode: HttpStatusCode.NOT_FOUND,
        });
      }

      const account = await stripe.accounts.create({
        email: user.email,
        // type: 'express',
        business_type: 'individual',
        individual: {
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ')[1] || '',
          phone: user.phone || undefined,
          email: user.email,
        },
      });

      // await prisma.user.update({
      //   where: { id: userId },
      //   data: { stripeCustomerId: account.id },
      // });
      return { stripeAccount: account };
    } catch (error) {
      console.log('Error creating Stripe account:', error);
      throw new HttpError({
        message: 'Failed to create Stripe account',
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        errors: [
          {
            message: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      });
    }
  }

  public async createStripeAccountLink(
    data: ICreateStripeAccountLinkDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }> {
    try {
      const accountLink = await stripe.accountLinks.create({
        account: data.accountId,
        return_url: `${data.origin}/return/${data.accountId}`,
        refresh_url: `${data.origin}/refresh/${data.accountId}`,
        type: 'account_onboarding',
      });
      return { stripeAccountLink: accountLink };
    } catch (error) {
      throw new HttpError({
        message: 'Failed to create Stripe account link',
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        errors: [
          {
            message: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      });
    }
  }

  public async onboardStripeAccount(
    data: IOnboardStripeAccountDTO,
  ): Promise<{ stripeAccountLink: Stripe.Response<Stripe.AccountLink> }> {
    try {
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

      const accountLink = await this.createStripeAccountLink({
        accountId,
        origin,
      });

      return { stripeAccountLink: accountLink.stripeAccountLink };
    } catch (error) {
      throw new HttpError({
        message: 'Failed to onboard Stripe account',
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        errors: [
          {
            message: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      });
    }
  }
}
