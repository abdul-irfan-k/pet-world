import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

import { logger } from '@/config';
import { HttpStatusCode } from '@/constants';
import { HttpError, verifyAccessToken } from '@/utils';

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    let token: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new HttpError({
        message: 'No access token provided',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    const payload = await verifyAccessToken(token);
    if (!payload) {
      throw new HttpError({
        message: 'Invalid token',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    req.user = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      logger.warn('Token has expired:', error.expiredAt);
      return next(
        new HttpError({
          message: 'Access token has expired. Please log in again.',
          statusCode: HttpStatusCode.UNAUTHORIZED,
        }),
      );
    }
    logger.error('Auth middleware error:', error);
    next(error);
  }
};
