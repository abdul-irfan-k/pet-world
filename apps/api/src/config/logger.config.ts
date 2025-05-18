import winston, {
  transports,
  format,
  LoggerOptions,
  Logger as WinstonLogger,
} from 'winston';

import { NODE_ENV } from './env.config';

class LoggerService {
  private logger: WinstonLogger;

  constructor() {
    const env = NODE_ENV || 'development';
    const isProduction = env === 'production';

    const loggerTransports: LoggerOptions['transports'] = [
      new transports.Console(),
    ];

    if (isProduction) {
      loggerTransports.push(
        new transports.File({
          filename: 'error.log',
          level: 'error',
        }),
        new transports.File({
          filename: 'combined.log',
        }),
      );
    }

    this.logger = winston.createLogger({
      level: isProduction ? 'info' : 'debug',
      format: format.json(),
      transports: loggerTransports,
    });
  }

  public getLogger(): WinstonLogger {
    return this.logger;
  }
}

const loggerServiceInstance = new LoggerService();
const logger = loggerServiceInstance.getLogger();

export { LoggerService, logger };
