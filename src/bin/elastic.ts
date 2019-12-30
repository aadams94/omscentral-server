import { writeFileSync } from 'fs';
import { init } from './utils';
import { Review } from '../models';
import * as fn from '../functions';

async function main(): Promise<void> {
  const reviews = await Review.query().withGraphFetched('[course,semester]');
  const documents = reviews.map(fn.toReviewDocument);
  writeFileSync(
    `${__dirname}/../../../_review_documents.json`,
    JSON.stringify(documents, null, 2),
    'utf8'
  );
}

init(main);
