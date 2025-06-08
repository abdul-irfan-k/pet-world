import { Request, Response, NextFunction } from 'express';

import type { IPaymentController } from './interfaces/IPaymentController';
import type { IPaymentService } from '@/services/interfaces/IPaymentService';

import { HttpStatusCode, ResponseMessages } from '@/constants';
import { PaymentService } from '@/services';
import { HttpError } from '@/utils';

export class PaymentController implements IPaymentController {
  private readonly _paymentService: IPaymentService;

  constructor() {
    this._paymentService = new PaymentService();
  }

  public async createStripeAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }
      const account = await this._paymentService.createStripeAccount({
        userId,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: account,
        message: 'Stripe account created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async createStripeAccountLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accountId } = req.body;

      const origin = req.headers.origin;
      const accountLink = await this._paymentService.createStripeAccountLink({
        accountId: accountId,
        origin: origin,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: accountLink,
        message: 'Stripe account link created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async onboardStripeAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }

      const accountLink = await this._paymentService.onboardStripeAccount({
        userId,
        origin: req.headers.origin,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: accountLink,
        message: 'Stripe account onboarding link created successfully',
      });
    } catch (error) {
      console.log('Error in onboardStripeAccount:', error);
      next(error);
    }
  }
}
