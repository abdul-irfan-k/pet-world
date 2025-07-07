import { Router } from 'express';

import { AuthController } from '@/controller';
import { authMiddleware, schemaValidator } from '@/middleware';
import {
  signInSchema,
  signUpSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  verifyForgotPasswordSchema,
} from '@/schemas';

export class AuthRoutes {
  private readonly _authController: AuthController;

  constructor() {
    this._authController = new AuthController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post('/signup', schemaValidator(signUpSchema), this._authController.signup.bind(this._authController));
    router.post('/verify-email', this._authController.verifyEmail.bind(this._authController));
    router.post('/verify-email/resend', this._authController.resendVerificationEmail.bind(this._authController));

    router.post('/signin', schemaValidator(signInSchema), this._authController.signin.bind(this._authController));
    router.post(
      '/refresh-token',
      // schemaValidator(refreshTokenSchema),
      this._authController.refreshToken.bind(this._authController),
    );
    router.post(
      '/forgot-password',
      schemaValidator(forgotPasswordSchema),
      this._authController.forgotPassword.bind(this._authController),
    );
    router.post(
      '/verify-forgot-password',
      schemaValidator(verifyForgotPasswordSchema),
      this._authController.verifyForgotPassword.bind(this._authController),
    );
    router.post(
      '/logout',
      authMiddleware,
      // schemaValidator(logoutSchema),
      this._authController.logout.bind(this._authController),
    );
    router.post('/google-auth', this._authController.signInWithGoogle.bind(this._authController));

    router.get('/me', authMiddleware, this._authController.me.bind(this._authController));

    return router;
  }
}
