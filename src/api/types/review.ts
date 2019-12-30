import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat
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
    type: new GraphQLNonNull(GraphQLString)
  },
  author_id: {
    type: new GraphQLNonNull(GraphQLString)
  },
  course_id: {
    type: new GraphQLNonNull(GraphQLString)
  },
  semester_id: {
    type: new GraphQLNonNull(GraphQLString)
  },
  difficulty: {
    type: new GraphQLNonNull(GraphQLInt)
  },
  rating: {
    type: new GraphQLNonNull(GraphQLInt)
  },
  workload: {
    type: new GraphQLNonNull(GraphQLInt)
  },
  body: {
    type: new GraphQLNonNull(GraphQLString)
  }
};

export const reviewInputType = new GraphQLInputObjectType({
  name: 'ReviewInputType',
  fields: reviewFields
});

export const reviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: {
    ...reviewFields,
    created: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    updated: {
      type: GraphQLFloat
    }
  }
});
