import { JwtPayload }
from '../shared/middlewares/auth.middleware.js';

declare global {

  namespace Express {

    interface Request {

      user: JwtPayload;
    }
  }
}

export {};