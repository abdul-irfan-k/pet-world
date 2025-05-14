import { NextFunction, Request, Response } from 'express';

import { logger } from '@/config';
import { HttpStatusCode } from '@/constants';
import { HttpError, verifyAccessToken } from '@/utils';

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpError({
        message: 'Authorization header is missing',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new HttpError({
        message: 'Invalid authorization format',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    const token = authHeader.split(' ')[1];

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
    logger.error('Auth middleware error:', error);
    next(error);
  }
};
