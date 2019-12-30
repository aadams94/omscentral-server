import { elastic } from '../components';

async function unindexReviews(id: string): Promise<void>;
async function unindexReviews(ids: string[]): Promise<void>;
async function unindexReviews(idOrIds: string | string[]): Promise<void> {
  const ids = [].concat(idOrIds).filter(Boolean);
  if (ids.length) {
    await elastic.unindexDocuments(ids);
  }
}

export { unindexReviews };
