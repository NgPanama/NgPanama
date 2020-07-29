import {
  MutationRegisterArgs,
  MutationLoginArgs,
  LoginResponse,
  Result,
  MutationActivateArgs,
  QueryUserArgs,
} from '../../interfaces/types';
import IContext from '../../interfaces/IContext';
import AuthService from '../../lib/auth';
import {EmailsService} from '../../services';

const resolveFunctions = {
  Query: {
    user: async (_, args: QueryUserArgs, context: IContext) => {
      const result = await context.dataSources.UserDataSource.find(args.email);

      return result;
    },
    users: async (_, args, context: IContext) => {
      const result = await context.dataSources.UserDataSource.findAll();

      return result;
    },
  },
  Mutation: {
    register: async (_, args: MutationRegisterArgs, context: IContext) => {
      const emailsService: EmailsService = context.services.emailsService;
      let result: Result;
      try {
        const response = await context.dataSources.UserDataSource.register(args.user);
        await emailsService.sendWelcome(response.user.email, response.token);
        result = {code: 200, message: 'Success', error: ''};
      } catch (e) {
        result = {code: 401, message: 'Internal error', error: e};

        return result;
      }

      return result;
    },
    login: async (_, args: MutationLoginArgs, context: IContext) => {
      let result: LoginResponse;
      result = await context.dataSources.UserDataSource.login(args.username, args.password);

      return result;
    },
    activate: async (_, args: MutationActivateArgs, context: IContext) => {
      let result: Result;
      try {
        const user = await AuthService.getUserName(context.token);
        await context.dataSources.UserDataSource.activate(user.Email, args.password);
        result = {code: 200, message: 'Success', error: ''};
      } catch (e) {
        result = {code: 401, message: 'Internal error', error: e};

        return result;
      }

      return result;
    },
  },
};

export default resolveFunctions;
