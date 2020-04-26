import { GraphQLObjectType } from 'graphql';
import { insertUser } from './insertUser';
import { updateUser } from './updateUser';
import { insertReview } from './insertReview';
import { updateReview } from './updateReview';
import { deleteReview } from './deleteReview';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Domain mutations.',
  fields: {
    insertUser,
    updateUser,
    insertReview,
    updateReview,
    deleteReview,
  },
});
