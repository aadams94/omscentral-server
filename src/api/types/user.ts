import { object, string, number } from '@hapi/joi';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLFloat,
} from 'graphql';
import { AuthProvider } from '../../enums';

export interface IUser {
  id: string;
  auth_provider: AuthProvider;
  email?: string;
  name?: string;
  photo_url?: string;
  program_id?: string;
  specialization_id?: string;
  last_signed_in?: number;
}

const userFields = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  auth_provider: {
    type: GraphQLString,
  },
  email: {
    type: GraphQLString,
  },
  name: {
    type: GraphQLString,
  },
  photo_url: {
    type: GraphQLString,
  },
  program_id: {
    type: GraphQLString,
  },
  specialization_id: {
    type: GraphQLString,
  },
  last_signed_in: {
    type: GraphQLFloat,
  },
};

export const userInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: userFields,
});

export const userType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    ...userFields,
    created: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    updated: {
      type: GraphQLFloat,
    },
  },
});

export const userValidationType = object().keys({
  id: string().required(),
  auth_provider: string().valid(...Object.values(AuthProvider)),
  email: string(),
  name: string(),
  photo_url: string().allow(null),
  program_id: string().allow(null),
  specialization_id: string().allow(null),
  last_signed_in: number(),
});
