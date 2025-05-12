import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { logger } from '@/config';

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
      const validatedData = await validationSchema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      let validationError = error;

      if (error instanceof z.ZodError) {
        validationError = error.issues.map(issue => ({
          path: issue.path[0],
          message: issue.message,
        }));

        logger.debug('Schema validation failed', {
          path: req.path,
          errors: validationError,
        });
      }

      res.status(400).json({
        status: 'failed',
        error: validationError,
      });
      return;
    }
  };
};
