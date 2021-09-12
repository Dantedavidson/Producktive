import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_CONNECTION_STRING: string;
      TOKEN_SECERET: string;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      token: JwtPayload;
    }
  }
}
