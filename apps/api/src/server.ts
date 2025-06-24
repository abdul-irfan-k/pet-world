import { createServer, Server } from 'http';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { logger, PORT, CORS_ORIGINS } from './config';
import { AdminRoutes, AuthRoutes, PetCareRoutes, PetRoutes, UploadRoutes, UserRoutes } from './routes';
import { FavoriteRoutes } from './routes/favorites.routes';
import { PaymentRoutes } from './routes/payment.routes';
import { globalErrorHandler } from '@/middleware';
import bcrypt from 'bcrypt';

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
    const allowedOrigins = CORS_ORIGINS.split(',').map(origin => origin.trim());
    const vercelPreviewRegex = /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app(?:\/.*)?$/;

    this.app.use(
      cors({
        origin: [...allowedOrigins, vercelPreviewRegex],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
      }),
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
  }

  private configureRoutes(): void {
    this.app.use('/api/v1/auth/', new AuthRoutes().getRoutes());
    this.app.use('/api/v1/pets/', new PetRoutes().getRoutes());
    this.app.use('/api/v1/favorites/', new FavoriteRoutes().getRoutes());
    this.app.use('/api/v1/upload/', new UploadRoutes().getRoutes());
    this.app.use('/api/v1/pet-care/', new PetCareRoutes().getRoutes());
    this.app.use('/api/v1/users/', new UserRoutes().getRoutes());
    this.app.use('/api/v1/payments/', new PaymentRoutes().getRoutes());
    // Admin Routes
    this.app.use('/api/v1/admin/', new AdminRoutes().getRoutes());
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
