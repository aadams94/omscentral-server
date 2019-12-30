import { init } from './utils';
import * as fn from '../functions';

async function main(): Promise<void> {
  await fn.upsertCourseMetrics();
}

init(main);
