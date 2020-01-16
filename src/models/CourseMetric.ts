import { Domain } from './Domain';

interface IStats {
  mean: number;
  median: number;
  mode: number;
  min: number;
  max: number;
}

const statsSchema = {
  type: 'object',
  required: ['mean', 'median', 'mode'],
  properties: {
    mean: { type: 'number' },
    median: { type: 'number' },
    mode: { type: 'number' },
    min: { type: 'number' },
    max: { type: 'number' }
  }
};

export class CourseMetric extends Domain {
  course_id: string;
  reviews: {
    count: number;
    difficulty: IStats;
    workload: IStats;
    rating: IStats;
  };

  static tableName = 'omscentral_course_metric';

  static idColumn = 'course_id';

  static jsonAttributes = ['reviews'];

  static jsonSchema = {
    type: 'object',
    required: ['course_id', 'reviews'],
    properties: {
      course_id: { type: 'string' },
      reviews: {
        type: 'object',
        required: ['count', 'workload', 'difficulty', 'rating'],
        properties: {
          count: { type: 'integer' },
          difficulty: statsSchema,
          workload: statsSchema,
          rating: statsSchema
        }
      }
    }
  };
}
