import { Router } from 'express';

import { AuthController } from '@/controller';
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
  private readonly _authController: AuthController;

  constructor() {
    this._authController = new AuthController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/signup',
      schemaValidator(signUpSchema),
      this._authController.signup.bind(this._authController),
    );
    router.post(
      '/signin',
      schemaValidator(signInSchema),
      this._authController.signin.bind(this._authController),
    );
    router.post(
      '/refresh-token',
      schemaValidator(refreshTokenSchema),
      this._authController.refreshToken.bind(this._authController),
    );
    router.post(
      '/forgot-password',
      schemaValidator(forgotPasswordSchema),
      this._authController.forgotPassword.bind(this._authController),
    );
    router.post(
      '/reset-password',
      schemaValidator(resetPasswordSchema),
      this._authController.resetPassword.bind(this._authController),
    );
    router.post(
      '/logout',
      schemaValidator(logoutSchema),
      this._authController.logout.bind(this._authController),
    );

    return router;
  }
}
