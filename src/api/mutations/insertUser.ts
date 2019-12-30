import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { forbidden } from 'boom';
import { IRequest } from '../../middleware';
import { userType, userInputType, IUser } from '../types';
import * as fn from '../../functions';

export const insertUser: GraphQLFieldConfig<any, IRequest> = {
  description: 'Inserts a user record.',
  type: new GraphQLNonNull(userType),
  args: {
    user: {
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: (root, args: { user: IUser }, req) => {
    if (req.userId !== args.user.id) {
      throw forbidden();
    }
    return fn.insertUser(args.user);
  }
};
