import { NextFunction, Request, Response } from 'express';

import { logger } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { BaseHttpError } from '@/utils/errors';

/**
 * Error handler middleware for Express.js.
 *
 * @param error - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param _next - The next function in the middleware chain.
 */
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  try {
    if (error instanceof BaseHttpError) {
      const { errors, logging, message, name, statusCode } = error;
      if (logging) {
        logger.error(`${name}: ${message}`);
      }

      return res.status(statusCode).json({
        code: statusCode,
        message: message,
        errors,
      });
    }

    if (error instanceof Error) {
      logger.error(`[Error] ${error.message}`, { stack: error.stack });
    } else {
      logger.error('[Error] Unexpected throw:', error);
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: ResponseMessages.INTERNAL_SERVER_ERROR,
      status: 'error',
    });
  } catch (error) {
    logger.error('[ErrorHandler] Failed to process error:', error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: ResponseMessages.INTERNAL_SERVER_ERROR,
      status: 'error',
    });
  }
};
