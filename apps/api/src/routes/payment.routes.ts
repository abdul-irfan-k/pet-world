import { Request, Response, Router } from 'express';

import { stripe } from '@/config';
import { HttpStatusCode } from '@/constants';
import { HttpError } from '@/utils';

export class PaymentRoutes {
  public getRoutes(): Router {
    const router = Router();

    router.post('/stripe', async (req: Request, res: Response) => {
      try {
        const account = await stripe.accounts.create({});
        return res.status(HttpStatusCode.OK).json({
          message: 'Stripe account created successfully',
          account: account,
        });
      } catch (error) {
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
    });

    router.post('/stripe/account_link', async (req: Request, res: Response) => {
      try {
        const { account } = req.body;

        const accountLink = await stripe.accountLinks.create({
          account,
          return_url: `${req.headers.origin}/return/${account}`,
          refresh_url: `${req.headers.origin}/refresh/${account}`,
          type: 'account_onboarding',
        });

        return res.status(HttpStatusCode.OK).json({
          message: 'Stripe account link created successfully',
          accountLink,
        });
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
    });
    return router;
  }
}
