declare module '@elastic/app-search-node' {
  type BaseUrlFn = (accountHostKey: string) => string;

  interface IIndexResult {
    id: string;
    errors: string[];
  }

  interface IDestroyResult {
    id: string;
    deleted: boolean;
    result: boolean;
  }

  export default class ElasticClient {
    constructor(hostIdentifier: string, apiKey: string, baseUrlFn?: BaseUrlFn);

    indexDocuments<T>(
      engineName: string,
      documents: T[]
    ): Promise<IIndexResult[]>;

    destroyDocuments<T>(
      engineName: string,
      ids: string[]
    ): Promise<IDestroyResult[]>;
  }
}
