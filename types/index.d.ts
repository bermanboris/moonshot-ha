declare namespace Express {
  export interface Request {
    userAgent: IUAParser.IResult;
  }
}

declare module 'rate-limit-redis';

declare module NodeJS {
  interface Global {
    __MONGO_URI__: string;
  }
}
