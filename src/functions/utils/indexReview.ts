import { indexReviews } from '../indexReviews';
import { Review } from '../../models';

export const indexReview = (review: Review): Promise<Review> =>
  indexReviews(review.id).then(() => review);
