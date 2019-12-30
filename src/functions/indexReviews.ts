import { elastic } from '../components';
import { Review } from '../models';
import { Season, Difficulty, Rating } from '../enums';
import { enumName } from '../utils';
import { unknownSemester } from '../constants';

export interface IReviewDocument {
  id: string;
  course_number: string;
  course_department: string;
  course_name: string;
  course_foundational: boolean;
  course_deprecated: boolean;
  semester_year: string;
  semester_season: string;
  difficulty?: string;
  workload?: number;
  rating?: string;
  body?: string;
  created: string;
  updated?: string;
}

export { indexReviews };

async function indexReviews(): Promise<void>;
async function indexReviews(id: string): Promise<void>;
async function indexReviews(ids: string[]): Promise<void>;
async function indexReviews(idOrIds?: string | string[]): Promise<void> {
  const ids = [].concat(idOrIds).filter(Boolean);
  const reviews = await Review.query()
    .withGraphFetched('[course,semester]')
    .modify(query => ids.length && query.whereIn('id', ids));

  const documents = reviews.map(toReviewDocument);
  await elastic.indexDocuments(documents);
}

export const toReviewDocument = ({
  id,
  course,
  semester,
  difficulty: d,
  workload,
  rating: r,
  body,
  created,
  updated
}: Review): IReviewDocument => ({
  id,
  course_number: course.number,
  course_department: course.department,
  course_name: course.name,
  course_foundational: course.foundational,
  course_deprecated: course.deprecated,
  semester_year:
    semester.year === unknownSemester.year
      ? 'Unknown'
      : semester.year.toString(),
  semester_season: enumName<typeof Season, number>(Season, semester.season),
  difficulty: d && enumName<typeof Difficulty, number>(Difficulty, d),
  workload,
  rating: r && enumName<typeof Rating, number>(Rating, r),
  body,
  created: created && new Date(created).toISOString(),
  updated: updated && new Date(updated).toISOString()
});
