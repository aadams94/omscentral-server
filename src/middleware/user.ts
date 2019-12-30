import { RequestHandler, Request } from 'express';
import { firebase } from '../components';

export interface IRequest extends Request {
  userId?: string;
}

export const middleware = (): RequestHandler => async (
  req: IRequest,
  res,
  next
) => {
  req.userId = undefined;
  try {
    const idToken = req.headers.authorization;
    const { uid } = await firebase.auth().verifyIdToken(idToken);
    req.userId = uid;
  } catch {}
  next();
};
