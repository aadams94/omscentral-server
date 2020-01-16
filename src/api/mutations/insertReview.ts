import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { forbidden, badRequest } from 'boom';
import { IRequest } from '../../middleware';
import {
  reviewType,
  reviewInputType,
  reviewValidationType,
  IReview
} from '../types';
import * as fn from '../../functions';

export const insertReview: GraphQLFieldConfig<any, IRequest> = {
  description: 'Updates a review record.',
  type: new GraphQLNonNull(reviewType),
  args: {
    review: {
      type: new GraphQLNonNull(reviewInputType)
    }
  },
  resolve: async (root, args: { review: IReview }, req) => {
    if (args.review.author_id !== req.userId) {
      throw forbidden();
    }

    const { value, error } = await reviewValidationType.validate(args.review);
    if (error) {
      throw badRequest(error.message);
    }

    return fn.insertReview(value);
  }
};
