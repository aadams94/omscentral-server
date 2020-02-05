import { notFound } from 'boom';
import { Review } from '../models';
import { parallelize } from '../utils';
import { upsertReviewCourseMetrics, unindexReview } from './utils';
import { getReview } from './getReview';

export const deleteReview = async (id: string): Promise<Review> => {
  const review = await getReview(id);
  if (!review) {
    throw notFound();
  }

  await Review.query().deleteById(id);

  return parallelize(upsertReviewCourseMetrics, unindexReview)(review);
};
