import cors from 'cors';
import { RequestHandler } from 'express';
import { appConfig } from '../config';

export const middleware = (): RequestHandler =>
  appConfig.environment === 'production' || appConfig.environment === 'staging'
    ? cors({
        origin: (origin, callback) =>
          appConfig.corsWhitelist.includes(origin)
            ? callback(undefined, true)
            : callback(new Error(`"${origin}" not allowed by CORS.`), false),
      })
    : cors();

// export const middleware = (): RequestHandler => cors();
