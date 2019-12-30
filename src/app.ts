import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import lusca from 'lusca';

import { withBootable } from './components';
import { logger } from './components';
import * as phases from './phases';
import * as middleware from './middleware';

const app = withBootable(express(), logger);

app.phase(phases.createServer, 'create-server');
app.phase(phases.processEvents, 'process-events');
app.phase(phases.knex, 'knex');
app.phase(phases.postgres, 'postgres');
app.phase(phases.upsertCourseMetrics, 'upsert-course-metrics');

app.use(compression());

app.use(bodyParser.raw());
app.use(bodyParser.text({ type: ['*/xml'], limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(middleware.cors());
app.use(middleware.morgan());
// app.use(middleware.session());
app.use(middleware.user());

app.use('/graphql', middleware.graphql());

app.use(middleware.error());

export { app };
