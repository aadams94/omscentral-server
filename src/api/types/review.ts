import { object, string, number } from '@hapi/joi';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

export interface IReview {
  id: string;
  author_id: string;
  course_id: string;
  semester_id: string;
  difficulty: number;
  rating: number;
  workload: number;
  body: string;
}

const reviewFields = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  author_id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  course_id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  semester_id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  difficulty: {
    type: new GraphQLNonNull(GraphQLInt),
  },
  rating: {
    type: new GraphQLNonNull(GraphQLInt),
  },
  workload: {
    type: new GraphQLNonNull(GraphQLInt),
  },
  body: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

export const reviewInputType = new GraphQLInputObjectType({
  name: 'ReviewInputType',
  fields: reviewFields,
});

export const reviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: {
    ...reviewFields,
    created: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    updated: {
      type: GraphQLFloat,
    },
  },
});

export const reviewValidationType = object().keys({
  id: string(),
  author_id: string().required(),
  course_id: string().required(),
  semester_id: string().required(),
  difficulty: number().min(1).max(5).integer().required(),
  rating: number().min(1).max(5).integer().required(),
  workload: number().min(1).max(100).integer().required(),
  body: string().required(),
});
