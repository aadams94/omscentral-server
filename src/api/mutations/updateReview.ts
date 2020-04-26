import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { notFound, forbidden, badRequest } from 'boom';
import { IRequest } from '../../middleware';
import {
  reviewType,
  reviewInputType,
  reviewValidationType,
  IReview,
} from '../types';
import * as fn from '../../functions';

export const updateReview: GraphQLFieldConfig<any, IRequest> = {
  description: 'Updates a review record.',
  type: new GraphQLNonNull(reviewType),
  args: {
    review: {
      type: new GraphQLNonNull(reviewInputType),
    },
  },
  resolve: async (root, args: { review: IReview }, req) => {
    const review = await fn.getReview(args.review.id).select('author_id');
    if (!review) {
      throw notFound();
    }

    if (review.author_id !== req.userId) {
      throw forbidden();
    }

    if (review.author_id !== args.review.author_id) {
      throw badRequest();
    }

    const { value, error } = await reviewValidationType.validate(args.review);
    if (error) {
      throw badRequest(error.message);
    }

    return fn.updateReview(value);
  },
};
