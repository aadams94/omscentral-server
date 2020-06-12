import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { RequestHandler, Response } from 'express';
import fs from 'fs';
import graphqlHttp from 'express-graphql';

import { graphqlConfig } from '../config';
import { logger } from '../components';
import { Mutation, Query } from '../api';
import { Request, Context } from '../types';
import { User } from '../models';

export const middleware = (schemaFile: string): RequestHandler => {
  const schema = applyMiddleware(
    makeExecutableSchema<Context>({
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      typeDefs: fs.readFileSync(schemaFile, 'utf8'),
      resolvers: {
        Query,
        Mutation,
      },
    }),
  );

  return graphqlHttp(async (req: Request, res: Response) => {
    const user = req.userId && (await User.eagerQuery().findById(req.userId));
    const context: Context = { req, res, user, logger };

    return {
      schema,
      graphiql: graphqlConfig.inspector,
      context,
    };
  });
};
