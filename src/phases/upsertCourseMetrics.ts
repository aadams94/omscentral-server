import { PhaseFunction } from '../components';
import * as fn from '../functions';

export const phase: PhaseFunction = async (app, next) => {
  try {
    await fn.upsertCourseMetrics();
    next();
  } catch (error) {
    next(error);
  }
};
