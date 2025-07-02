import { Router } from 'express';

import { PaymentController } from '@/controller';
import { authMiddleware } from '@/middleware';

export class PaymentRoutes {
  private readonly _paymentController: PaymentController;

  constructor() {
    this._paymentController = new PaymentController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/stripe/onboard',
      authMiddleware,
      this._paymentController.onboardStripeAccount.bind(this._paymentController),
    );

    router.get(
      '/stripe/accounts',
      authMiddleware,
      this._paymentController.getStripeAccount.bind(this._paymentController),
    );

    router.post(
      '/pet-care-requests/:requestId/initiate-payment',
      authMiddleware,
      this._paymentController.initiatePetCarePayment.bind(this._paymentController),
    );

    return router;
  }
}
