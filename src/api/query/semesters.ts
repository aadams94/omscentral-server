import { QueryResolvers } from '../../generated/graphql';
import { Semester } from '../../models';
import { unknownSemester } from '../../constants';

type Resolver = QueryResolvers['semesters'];

export const resolver: Resolver = () =>
  Semester.query().orderBy('id', 'desc').whereNot('id', unknownSemester.id);
