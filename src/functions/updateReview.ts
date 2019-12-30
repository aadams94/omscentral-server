import { PartialModelObject as PMO } from 'objection';
import { Review } from '../models';
import { parallelize } from '../utils';
import { upsertReviewCourseMetrics, indexReview } from './utils';

export const updateReview = (review: PMO<Review>): Promise<Review> =>
  Review.query()
    .updateAndFetchById(review.id as string, review)
    .then(parallelize(upsertReviewCourseMetrics, indexReview));
