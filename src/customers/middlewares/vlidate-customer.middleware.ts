import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustommerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).send('No authentication token provided');
    }
    if (authorization === '123') {
      next();
    } else {
      res.status(403).send('Invalid authentication token is provided');
    }
  }
}
