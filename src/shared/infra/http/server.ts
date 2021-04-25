import "reflect-metadata";
import 'dotenv/config';
import express, {Request, Response, NextFunction} from 'express';
import {errors} from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/container';

import '../typeorm';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.code).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333, () => console.log('server is running at http://localhost:3333'));
