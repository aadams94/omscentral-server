import { QueryBuilder as QB } from 'objection';
import { GraphQLString } from 'graphql';
import { builder } from 'objection-graphql';
import * as models from '../models';
import mutations from './mutations';

export const schema = builder()
  .model(models.Config, {
    listFieldName: 'configs',
    fieldName: 'config'
  })
  .model(models.Course, {
    listFieldName: 'courses',
    fieldName: 'course'
  })
  .model(models.Program, {
    listFieldName: 'programs',
    fieldName: 'program'
  })
  .model(models.Review, {
    listFieldName: 'reviews',
    fieldName: 'review'
  })
  .model(models.Semester, {
    listFieldName: 'semesters',
    fieldName: 'semester'
  })
  .model(models.Specialization, {
    listFieldName: 'specializations',
    fieldName: 'specialization'
  })
  .model(models.User, {
    listFieldName: 'users',
    fieldName: 'user'
  })
  .extendWithMutations(mutations)
  .argFactory(() => ({
    orderByToo: {
      type: GraphQLString,
      query: (query: QB<any>, value: any) => query.orderBy(value)
    },
    orderByDescToo: {
      type: GraphQLString,
      query: (query: QB<any>, value: any) => query.orderBy(value, 'desc')
    }
  }))
  .build();
