import { logger } from './config';
import { ExpressServer } from './server';

async function bootstrap() {
  try {
    new ExpressServer().start();
  } catch (error) {
    logger.error('Failed to start the application:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Starting graceful shutdown...');
  process.exit(0);
});

bootstrap().catch(error => {
  logger.error('Unhandled error during bootstrap:', error);
  process.exit(1);
});
