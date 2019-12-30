import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { badRequest } from 'boom';
import { IRequest } from '../../middleware';
import { reviewType, reviewInputType, IReview } from '../types';
import * as fn from '../../functions';

export const insertReview: GraphQLFieldConfig<any, IRequest> = {
  description: 'Updates a review record.',
  type: new GraphQLNonNull(reviewType),
  args: {
    review: {
      type: new GraphQLNonNull(reviewInputType)
    }
  },
  resolve: (root, args: { review: IReview }, req) => {
    if (args.review.author_id !== req.userId) {
      throw badRequest();
    }
    return fn.insertReview(args.review);
  }
};
