import { createServer, Server } from 'http';

import express, { Application } from 'express';
import helmet from 'helmet';

import { logger, PORT } from './config';
import { AuthRoutes } from './routes';

import { globalErrorHandler } from '@/middleware/error-handler.middleware';

export class ExpressServer {
  private app: Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandlers();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(helmet());
  }

  private configureRoutes(): void {
    this.app.use('/api/v1/auth/', new AuthRoutes().getRoutes());
  }

  private configureErrorHandlers(): void {
    this.app.use(globalErrorHandler);
  }

  public start(): void {
    this.server.listen(PORT, () => {
      logger.info('Server is running on port ' + PORT);
    });
  }
}
