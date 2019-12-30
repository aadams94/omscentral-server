import { PartialModelObject as PMO } from 'objection';
import { Review } from '../models';
import { parallelize, id } from '../utils';
import { upsertReviewCourseMetrics, indexReview } from './utils';

export const insertReview = (review: PMO<Review>): Promise<Review> =>
  Review.query()
    .insertAndFetch({ ...review, id: id() })
    .then(parallelize(upsertReviewCourseMetrics, indexReview));
