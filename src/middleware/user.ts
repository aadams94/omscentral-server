import { RequestHandler } from 'express';

import { firebase } from '../components';
import { Request } from '../types';

export const middleware = (): RequestHandler => async (
  req: Request,
  res,
  next,
) => {
  req.userId = null;

  try {
    const idToken = req.headers.authorization;
    const { uid } = await firebase.auth().verifyIdToken(idToken);
    req.userId = uid;
  } catch {}

  next();
};
