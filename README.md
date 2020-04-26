# @omscentral/server

Node.js express server serving `@omscentral/client`.

## Tech

- [express](https://expressjs.com/)
- [postgres](https://www.postgresql.org/)
- [knex](http://knexjs.org/)
- [objection](https://vincit.github.io/objection.js/)
- [graphql-js](https://github.com/graphql/graphql-js)
- [firebase](https://firebase.google.com/)

## Getting Started

```
npm install
```

## Postgres

The server requires a database connection. After installing Postgres, create a local database and a user. For example:

```sql
CREATE DATABASE omscentral_scratch;
CREATE USER omscentral WITH PASSWORD 'password';
GRANT CONNECT ON DATABASE omscentral_scratch TO omscentral;
GRANT USAGE ON SCHEMA public TO omscentral;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO omscentral;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO omscentral;
```

## Firebase

If you haven't already, complete the instructions in [@omscentral/client](https://github.com/mehmetbajin/omscentral-client) README. You must create a Firebase project before proceeding.

## Environment Variables

First, copy the stock env var file.

```
cp .env.example .env
```

Next, from the "Settings" > "Service accounts" tab of your Firebase project, click "Generate new private key" and open the generated JSON.

Then, complete `.env` based on the following expectations:

| variable                          | description                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| NODE_ENV                          | `"local" | "test" | "staging" | "production"` (recommend `"local"`)                 |
| PORT                              | port expected by `@omscentral/client`                                               |
| OMSCENTRAL_NAME                   | human-readable instance name for logging                                            |
| OMSCENTRAL_MORGAN_FORMAT          | predefined [morgan format](https://www.npmjs.com/package/morgan#predefined-formats) |
| OMSCENTRAL_GRAPHQL_INSPECTOR      | whether graphql inspector is enabled (`1`-enabled, `undefined`-disabled)            |
| OMSCENTRAL_CORS_WHITELIST         | comma-delimited list of hostnames exempt from CORS check                            |
| OMSCENTRAL_SESSION_SECRET         | value used to sign session cookie                                                   |
| OMSCENTRAL_SESSION_MAX_AGE        | # of hours after which session cookie expires                                       |
| OMSCENTRAL_SESSION_CLEAR_INTERVAL | frequency (in hours) for session cookie garbage collection                          |
| OMSCENTRAL_FIREBASE_PRIVATE_KEY   | from firebase private key json                                                      |
| OMSCENTRAL_FIREBASE_CLIENT_EMAIL  | from firebase private key json                                                      |
| OMSCENTRAL_FIREBASE_PROJECT_ID    | from firebase private key json                                                      |
| OMSCENTRAL_FIREBASE_DATABASE_URL  | from firebase private key json                                                      |
| OMSCENTRAL_POSTGRES_CONNECTION    | postgres connection string                                                          |

Note that when `NODE_ENV` is not `"production"`, CORS check is skipped and `OMSCENTRAL_CORS_WHITELIST` is ignored.

## Migrations

Before starting the server, make sure the migrations are up to date:

```
npm run build && npm run migrate:latest
```

If this fails, check the `OMSCENTRAL_POSTGRES_CONNECTION` environment variable and make sure it's configured correctly.

## Start

```
npm run watch
```

Starts server w/hot-reloading.

## GraphQL

To engage with the graphql inspector, visit `/graphql` of the api server.

The [staging inspector](https://omscentral-api-staging.herokuapp.com/graphql) is useful for interacting with production-like data.

## Deployment

Merging to `master` initiates a deployment to the staging environment. Once verified in staging, the build is promoted to production from Heroku console.
