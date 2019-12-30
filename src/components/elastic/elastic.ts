import Client from '@elastic/app-search-node';
import { elasticConfig } from '../../config';
import { serialize } from '../../utils';

const { hostIdentifier, apiKey, engineName } = elasticConfig;

// https://github.com/elastic/app-search-node#usage

const client = elasticConfig.enabled && new Client(hostIdentifier, apiKey);

const indexDocuments: <T>(
  documents: T[]
) => Promise<void> = async documents => {
  if (elasticConfig.enabled) {
    await serialize(
      documents,
      chunk => client.indexDocuments(engineName, chunk),
      100,
      100
    );
  }
};

const unindexDocuments: (ids: string[]) => Promise<void> = async ids => {
  if (elasticConfig.enabled) {
    await serialize(
      ids,
      chunk => client.destroyDocuments(engineName, chunk),
      100,
      100
    );
  }
};

export const elastic = {
  indexDocuments,
  unindexDocuments
};
