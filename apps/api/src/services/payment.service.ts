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

  async getSTripeAccount(data: IGetStripeAccountDTO): Promise<{ stripeAccount: Stripe.Response<Stripe.Account> }> {
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
    return { stripeAccount: account };
  }
}
