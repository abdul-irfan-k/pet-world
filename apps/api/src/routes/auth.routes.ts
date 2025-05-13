import { Router } from 'express';

import { schemaValidator } from '@/middleware';
import {
  signInSchema,
  signUpSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  logoutSchema,
} from '@/schemas';

export class AuthRoutes {
  public getRoutes(): Router {
    const router = Router();

    router.post('/signup', schemaValidator(signUpSchema));
    router.post('/signin', schemaValidator(signInSchema));
    router.post('/refresh-token', schemaValidator(refreshTokenSchema));
    router.post('/forgot-password', schemaValidator(forgotPasswordSchema));
    router.post('/reset-password', schemaValidator(resetPasswordSchema));
    router.post('/logout', schemaValidator(logoutSchema));

    return router;
  }
}
