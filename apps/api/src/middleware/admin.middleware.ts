import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, JwtPayload } from 'jsonwebtoken';

import { logger } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { HttpError, verifyAccessToken } from '@/utils';

interface IAdminPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const adminAuthMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.adminAccessToken) {
      token = req.cookies.adminAccessToken;
    }

    if (!token) {
      throw new HttpError({
        message: 'No admin access token provided',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    const payload = (await verifyAccessToken(token)) as IAdminPayload;

    if (!payload) {
      throw new HttpError({
        message: 'Invalid admin token',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    if (payload.role !== 'admin') {
      throw new HttpError({
        message: ResponseMessages.FORBIDDEN,
        statusCode: HttpStatusCode.FORBIDDEN,
      });
    }

    req.user = {
      id: payload.id,
      email: payload.email,
      role: 'admin',
    };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      logger.warn('Admin token has expired:', (error as TokenExpiredError).expiredAt);
      return next(
        new HttpError({
          message: 'ADMIN_ACCESS_TOKEN_EXPIRED',
          statusCode: HttpStatusCode.UNAUTHORIZED,
        }),
      );
    }
    logger.error('Admin middleware error:', error);
    next(error);
  }
};
