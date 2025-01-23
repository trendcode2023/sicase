import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `estas ejecutando un metodo en la ruta ${req.method} en la ruta ${req.url}`,
    );
    next();
  }
  // throw new Error('Method not implemented.');
}

export function loggerMiddlewareGlobal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { method, originalUrl } = req;
  const timestamp = new Date().toISOString();
  console.log(
    `Estas ejecutando el metodo:${method} el la ruta ${originalUrl} [${timestamp}]`,
  );
  next();
}
