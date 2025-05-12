import { NextFunction, Request, Response } from 'express';

import { logger } from '@/config';
import { HttpStatusCode } from '@/constants';
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

      res.status(statusCode).json({
        code: statusCode,
        message: message,
        errors,
      });
    } else {
      logger.error(`Internal Server Error: ${error.message}`);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        status: 'error',
      });
    }
  } catch (error) {
    logger.error(`Error handling error: ${error}`);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      status: 'error',
    });
  }
};
