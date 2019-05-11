declare namespace Express {
  export interface Request {
    userAgent: IUAParser.IResult;
  }
}

declare module 'rate-limit-redis';
