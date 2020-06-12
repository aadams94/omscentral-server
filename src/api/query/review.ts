import { notFound } from '@hapi/boom';

import { QueryResolvers } from '../../generated/graphql';
import { Review } from '../../models';

type Resolver = QueryResolvers['review'];

export const resolver: Resolver = async (_, { id }) => {
  const review = await Review.eagerQuery().findById(id);
  if (!review) {
    throw notFound();
  }
  return review;
};
