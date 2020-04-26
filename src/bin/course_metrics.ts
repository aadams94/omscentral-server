import { init } from './utils';
import * as fn from '../functions';
import { logger } from '../components';

async function main(): Promise<void> {
  try {
    await fn.upsertCourseMetrics();
  } catch (error) {
    logger.error(error);
  }
}

init(main);
