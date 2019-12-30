import cors from 'cors';
import { RequestHandler } from 'express';
import { appConfig } from '../config';

export const middleware = (): RequestHandler =>
  cors({
    origin: (origin, callback) =>
      appConfig.environment !== 'production' ||
      appConfig.corsWhitelist.includes(origin)
        ? callback(undefined, true)
        : callback(new Error(`"${origin}" not allowed by CORS.`))
  });
