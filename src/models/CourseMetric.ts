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
  data: {
    review_count: number;
    difficulty: IStats;
    workload: IStats;
    rating: IStats;
  };

  static tableName = 'omscentral_course_metric';

  static idColumn = 'course_id';

  static jsonAttributes = ['data'];

  static jsonSchema = {
    type: 'object',
    required: ['course_id', 'data'],
    properties: {
      course_id: { type: 'string' },
      data: {
        type: 'object',
        required: ['review_count', 'workload', 'difficulty', 'rating'],
        properties: {
          review_count: { type: 'integer' },
          difficulty: statsSchema,
          workload: statsSchema,
          rating: statsSchema
        }
      }
    }
  };
}
