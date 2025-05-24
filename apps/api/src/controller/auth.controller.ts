import type { IAuthController } from './interfaces/IAuthController';
import type { IAuthService } from '@/services/interfaces/IAuthService';
import type { Request, Response, NextFunction } from 'express';

import { NODE_ENV } from '@/config';
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
      const { email, password, firstName, lastName, userName } = req.body;

      const result = await this._authService.signup({
        email,
        password,
        firstName,
        lastName,
        userName,
      });

      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: {
          user: result.user,
        },
        message: ResponseMessages.USER_REGISTERED,
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

      const isProduction = NODE_ENV === 'production';
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',

        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: result.user,
        },
        message: ResponseMessages.LOGIN_SUCCESS,
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
        status: 'success',
        data: {
          accessToken: result.accessToken,
        },
        message: ResponseMessages.SUCCESS,
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
        status: 'success',
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async verifyForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, code, newPassword } = req.body;

      const result = await this._authService.verifyForgotPassword({
        code,
        newPassword,
        email,
      });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: result.message,
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
      // const refreshToken = req.cookies.refreshToken;
      const id = req.user?.id;

      if (id) {
        await this._authService.logout({ id });
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.LOGOUT_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async me(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
        });
      }

      const result = await this._authService.me({ id });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: {
          user: result.user,
        },
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }
}
