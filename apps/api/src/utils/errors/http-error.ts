import { BaseHttpError } from './base-http.error';

export class HttpError extends BaseHttpError {
  constructor(params: {
    message: string;
    errors?: Array<{ message: string; context?: Record<string, string> }>;
    statusCode: number;
    logging?: boolean;
  }) {
    super({
      message: params.message,
      statusCode: params.statusCode,
      errors: params.errors || [{ message: params.message }],
      logging: params.logging ?? false,
    });
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
