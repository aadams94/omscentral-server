import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { forbidden, badRequest } from 'boom';
import { IRequest } from '../../middleware';
import { userType, userInputType, userValidationType, IUser } from '../types';
import * as fn from '../../functions';

export const insertUser: GraphQLFieldConfig<any, IRequest> = {
  description: 'Inserts a user record.',
  type: new GraphQLNonNull(userType),
  args: {
    user: {
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: async (root, args: { user: IUser }, req) => {
    if (req.userId !== args.user.id) {
      throw forbidden();
    }

    const { value, error } = await userValidationType.validate(args.user);
    if (error) {
      throw badRequest(error.message);
    }

    return fn.insertUser(value);
  }
};
