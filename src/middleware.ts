import bodyParser from 'body-parser';
import { Application, NextFunction, Request, Response } from 'express';
import ExpressRateLimit from 'express-rate-limit';
import morgan from 'morgan';
import RedisStore from 'rate-limit-redis';
import { UAParser } from 'ua-parser-js';
import { redis } from './redis';

export function userAgent(req: Request, _: Response, next: NextFunction) {
  const userAgent = req.headers['user-agent'] || '';
  const userAgentParser = new UAParser(userAgent);
  req.userAgent = userAgentParser.getResult();
  return next();
}

export async function restrictRequests(req: Request, res: Response, next: NextFunction) {
  const isAllowed = await redis.sismember('allowed_domains', req.hostname);

  if (isAllowed === 0) {
    res.status(401);
    return res.json({ error: 'Unauthorized' });
  }

  return next();
}

export function rateLimiter(minutes: number = 1, limit: number = 30) {
  return new ExpressRateLimit({
    windowMs: minutes * 60 * 1000,
    max: limit,
    store: new RedisStore({ client: redis }),
  });
}

export function applyMiddlewares(app: Application) {
  app.enable('trust proxy');
  app.use(restrictRequests);
  app.use(userAgent);
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
