import Boom from 'boom';
import { ErrorRequestHandler } from 'express';
import { appConfig } from '../config';

export const middleware = (): ErrorRequestHandler => (
  error: Error | Boom | any,
  req,
  res,
  next
) => {
  if (!error) {
    return next();
  }

  const { output } = parseError(error);

  return res.status(output.statusCode).json({
    ...output.payload,
    stack:
      appConfig.environment !== 'production' &&
      appConfig.environment !== 'staging'
        ? (error.stack || '').split(/\n\s+/g)
        : undefined,
  });
};

const parseError = (error: Error | Boom | any): Boom =>
  error instanceof Boom
    ? error
    : Boom.boomify(new Error(error), {
        statusCode: error.status || error.statusCode || 500,
      });
