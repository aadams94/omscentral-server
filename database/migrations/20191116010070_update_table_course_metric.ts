import Knex from 'knex';
import { Model } from 'objection';
import { CourseMetric } from '../../src/models';
import * as fn from '../../src/functions';

exports.up = async (knex: Knex) => {
  Model.knex(knex);
  await fn.upsertCourseMetrics();
};

exports.down = async (knex: Knex) => {
  CourseMetric.knex(knex);
  await CourseMetric.query().delete();
};
