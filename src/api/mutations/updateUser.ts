import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { forbidden } from 'boom';
import { userType, userInputType, IUser } from '../types';
import { IRequest } from '../../middleware';
import * as fn from '../../functions';

export const updateUser: GraphQLFieldConfig<any, IRequest> = {
  description: 'Updates a user record.',
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
    return fn.updateUser(args.user);
  }
};
