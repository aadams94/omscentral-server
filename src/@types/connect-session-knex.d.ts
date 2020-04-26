declare module 'connect-session-knex' {
  import Session, { Store } from 'express-session';
  import Knex from 'knex';

  // https://www.npmjs.com/package/connect-session-knex#options
  interface IKnexSessionStoreOptions {
    knex: Knex;
    tablename?: string;
    sidfieldname?: string;
    createtable?: boolean;
    clearInterval?: number;
  }

  class KnexSessionStore extends Store {
    constructor(options: IKnexSessionStoreOptions);
  }

  function connectSessionKnex(session: typeof Session): typeof KnexSessionStore;

  export default connectSessionKnex;
}
