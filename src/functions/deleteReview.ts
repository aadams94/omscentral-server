import { Review } from '../models';
import { parallelize } from '../utils';
import { upsertReviewCourseMetrics, unindexReview } from './utils';

export const deleteReview = (id: string): Promise<Review> =>
  Review.query()
    .deleteById(id)
    .returning('*')
    .first()
    .then(parallelize(upsertReviewCourseMetrics, unindexReview));
