import { unindexReviews } from '../unindexReviews';
import { Review } from '../../models';

export const unindexReview = (review: Review): Promise<Review> =>
  unindexReviews(review.id).then(() => review);
