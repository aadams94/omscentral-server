import graphqlHttp from 'express-graphql';
import { RequestHandler } from 'express';
import { graphqlConfig } from '../config';
import { schema, root as rootValue } from '../api';

export const middleware = (): RequestHandler =>
  graphqlHttp({
    schema,
    rootValue,
    graphiql: graphqlConfig.inspector,
  });
