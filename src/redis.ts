import Redis from 'ioredis';
import { config } from './config';

export const redis = new Redis({
  host: config.redis.hostname,
  port: config.redis.port,
  db: config.redis.db,
});
