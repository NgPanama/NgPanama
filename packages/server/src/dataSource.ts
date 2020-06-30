import { Injector } from 'injection-js';
import {
  UserDataSource,
} from './graphql/datasources';
import { IAppDataSource } from './interfaces/IAppDataSource';

export const getDataSources = (injector: Injector): IAppDataSource => {
  return {    
    UserDataSource: injector.get(UserDataSource),
  };
};
