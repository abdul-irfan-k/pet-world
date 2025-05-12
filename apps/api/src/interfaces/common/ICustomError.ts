export interface ICustomError {
  message: string;
  errors: Array<{ message: string; context?: Record<string, string> }>;
  statusCode: number;
  logging: boolean;
}
