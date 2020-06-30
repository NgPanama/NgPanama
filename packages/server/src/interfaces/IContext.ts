import {IAppDataSource} from './IAppDataSource';
import {IAppContext} from './IAppContext';

export default interface IContext {
  currentUser: string;
  currentCompany: string;
  token: string;
  services: IAppContext;
  dataSources: IAppDataSource;
}
