import { ICustomError } from '../../interfaces/common/ICustomError';

export abstract class BaseHttpError extends Error implements ICustomError {
  public message: string;
  public errors: Array<{ message: string; context?: Record<string, string> }>;
  public statusCode: number;
  public logging: boolean;

  constructor(params: {
    message: string;
    errors?: Array<{ message: string; context?: Record<string, string> }>;
    statusCode: number;
    logging?: boolean;
  }) {
    super(params.message);
    this.message = params.message;
    this.statusCode = params.statusCode;
    this.errors = params.errors ?? [];
    this.logging = params.logging ?? false;

    Object.setPrototypeOf(this, BaseHttpError.prototype);
  }
}
