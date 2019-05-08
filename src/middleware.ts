import { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { UAParser } from 'ua-parser-js';

export function userAgent(req: Request, _: Response, next: NextFunction) {
  const userAgent = req.headers['user-agent'] || '';
  const userAgentParser = new UAParser(userAgent);
  req.userAgent = userAgentParser.getResult();
  next();
}

export function applyMiddlewares(app: Application) {
  app.use(userAgent);
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
