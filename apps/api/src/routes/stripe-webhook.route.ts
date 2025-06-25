import { Router, raw } from 'express';

import { PaymentController } from '@/controller';

export class StripeWebhookRoutes {
  private readonly _paymentController: PaymentController;

  constructor() {
    this._paymentController = new PaymentController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/stripe/webhook',
      raw({ type: 'application/json' }),
      this._paymentController.handleStripeWebhook.bind(this._paymentController),
    );
    return router;
  }
}
