import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { notFound, forbidden } from 'boom';
import { IRequest } from '../../middleware';
import { reviewType } from '../types';
import * as fn from '../../functions';

export const deleteReview: GraphQLFieldConfig<any, IRequest> = {
  description: 'Deletes a review record.',
  type: new GraphQLNonNull(reviewType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (root, args: { id: string }, req) => {
    const review = await fn.getReview(args.id).select('author_id');
    if (!review) {
      throw notFound();
    }

    if (review.author_id !== req.userId) {
      throw forbidden();
    }

    return fn.deleteReview(args.id);
  },
};
