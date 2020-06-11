import knex from 'knex';
import session from 'express-session';
import connectSessionKnex from 'connect-session-knex';
import { RequestHandler } from 'express';
import knexConfig from '../../database/knexfile';
import { sessionConfig } from '../config';

export const middleware = (): RequestHandler => {
  const KnexSessionStore = connectSessionKnex(session);

  const store = new KnexSessionStore({
    knex: knex(knexConfig),
    tablename: 'omscentral_session',
    sidfieldname: 'id',
    createTable: false,
    clearInterval: sessionConfig.clearInterval,
  });

  return session({
    store,
    secret: sessionConfig.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: sessionConfig.maxAge,
    },
  });
};
