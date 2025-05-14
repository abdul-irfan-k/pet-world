import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { logger } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';

/**
 * Middleware to validate request body using Zod schema.
 *
 * On successful validation, attaches the parsed data to req.body and calls next()`.
 * On failure, sends a 400 response with validation errors.
 *
 * @param validationSchema Zod schema to validate against
 * @returns Middleware function
 */
export const schemaValidator = (validationSchema: z.ZodSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const parsed = await validationSchema.parseAsync(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      let issues = error;

      if (error instanceof z.ZodError) {
        issues = error.issues.map(issue => ({
          path: issue.path[0],
          message: issue.message,
        }));

        logger.debug('Schema validation failed', {
          path: req.path,
          issues,
        });

        res.status(HttpStatusCode.BAD_REQUEST).json({
          status: 'failed',
          error: issues,
          message: ResponseMessages.VALIDATION_FAILED,
        });
        return;
      }

      return next(error);
    }
  };
};
