import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';

import type { IPaymentController } from './interfaces/IPaymentController';
import type { IPaymentService } from '@/services/interfaces/IPaymentService';

import { stripe } from '@/config';
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

  public async getStripeAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }

      const account = await this._paymentService.getSTripeAccount({
        userId,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: account,
        message: 'Stripe account retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  public async handleStripeWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event: Stripe.Event | undefined;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (error: any) {
      res.status(HttpStatusCode.BAD_REQUEST).send(`Webhook Error: ${error.message}`);
    }
    try {
      //eslint-disable-next-line
      //@ts-ignore
      switch (event.type) {
        case 'payment_intent.succeeded':
          //eslint-disable-next-line
          //@ts-ignore
          await this._paymentService.handlePaymentSucceededWebhook(event.data.object as Stripe.PaymentIntent);
          break;

        default:
          //eslint-disable-next-line
          //@ts-ignore
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.status(HttpStatusCode.OK).json({ received: true });
    } catch (error) {
      next(error);
    }
  }

  public async initiatePetCarePayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { proposalId: petCareProposalId } = req.body;
      const { requestId: petCareRequestId } = req.params;

      if (!petCareProposalId) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: 'Pet care proposal ID is required.',
        });
      }
      if (!petCareRequestId) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: 'Pet care request ID is required.',
        });
      }

      const result = await this._paymentService.initiatePetCarePayment({
        userId: req.user!.id,
        petCareRequestId,
        petCareProposalId,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getEarnings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }

      const earnings = await this._paymentService.getEarnings({ userId });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: earnings,
        message: 'Earnings retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
