import { NextFunction, Request, Response } from 'express';

export interface IPaymentController {
  createStripeAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  createStripeAccountLink(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  onboardStripeAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
