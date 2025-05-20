import * as fs from 'fs';
import * as path from 'path';

import { logger } from './config';
import { ExpressServer } from './server';

async function bootstrap() {
  try {
    const tempDir = path.join(process.cwd(), 'uploads/temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
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
