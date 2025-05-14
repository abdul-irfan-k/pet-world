import type { IAuthController } from './interfaces/IAuthController';
import type { IAuthService } from '@/services/interfaces/IAuthService';
import type { Request, Response, NextFunction } from 'express';

import { HttpStatusCode, ResponseMessages } from '@/constants';
import { AuthService } from '@/services';
import { HttpError } from '@/utils';

export class AuthController implements IAuthController {
  private readonly _authService: IAuthService;

  constructor(authService: IAuthService = new AuthService()) {
    this._authService = authService;
  }

  public async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password, firstName, lastName, userId } = req.body;

      const result = await this._authService.signup({
        email,
        password,
        firstName,
        lastName,
        userId,
      });

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: ResponseMessages.USER_REGISTERED,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async signin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this._authService.signin({ email, password });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.LOGIN_SUCCESS,
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.BAD_REQUEST,
        });
      }

      const result = await this._authService.refreshToken({ refreshToken });

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;

      await this._authService.forgotPassword({ email });

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { token, newPassword } = req.body;

      await this._authService.resetPassword({ resetToken: token, newPassword });

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userId = req.user?.id;

      if (refreshToken && userId) {
        await this._authService.logout({ userId });
      }

      res.clearCookie('refreshToken');

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.LOGOUT_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }
}
