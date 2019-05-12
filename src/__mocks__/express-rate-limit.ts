import { NextFunction, Request, Response } from 'express';

export default function ExpressRateLimit() {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}
