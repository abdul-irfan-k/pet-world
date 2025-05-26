import Redis from 'ioredis';

import { logger } from './logger.config';

let redisClient: Redis | undefined;
const connectRedis = () => {
  const redisConfig = {
    host: process.env.HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
  };

  //eslint-disable-next-line
  //@ts-ignore
  const redis = new Redis(redisConfig);

  redis.on('connect', () => {
    logger.info('Connected to Redis');
  });

  redis.on('error', err => {
    logger.error('Redis connection error:', err);
  });
};

export { connectRedis, redisClient };
