import cors from 'cors';
import { RequestHandler } from 'express';
// import { appConfig } from '../config';

// disable CORS for SEO...

export const middleware = (): RequestHandler => cors();

// appConfig.environment === 'production' || appConfig.environment === 'staging'
//   ? cors({
//       origin: (origin, callback) =>
//         appConfig.corsWhitelist.includes(origin)
//           ? callback(undefined, true)
//           : callback(new Error(`"${origin}" not allowed by CORS.`), false),
//     })
//   : cors();
