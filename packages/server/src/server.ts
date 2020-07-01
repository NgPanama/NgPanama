import schema from './graphql/schema/schema';
import {AbstractLogger} from './core/logger/AbstractLogger';
import {IAppContext} from './interfaces/IAppContext';
import {Injectable, Injector} from 'injection-js';
import {getContext} from './context';
import {getDataSources} from './dataSource';
import AuthService from './lib/auth';

import * as cors from 'cors';
import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';
import * as serverless from 'serverless-http';

@Injectable()
export class Server {
  private app: express.Express;
  private apolloServer: ApolloServer;
  private appContext: IAppContext;
  private dataSources: any;
  private handler: any;
  constructor(private logger: AbstractLogger) {}

  public initContext(injector: Injector) {
    this.appContext = getContext(injector);
    this.dataSources = getDataSources(injector);
  }

  public initServer(injector: Injector) {
    this.initContext(injector);
    this.logger.info('Starting graphql server...');
    this.app = express().use('*', cors());
    this.createApolloServer();
  }

  public getApolloInstance() {
    return this.handler;
  }

  private context = async ({res, req}) => {
    const services: IAppContext = this.appContext;
    const tokenWithBearer = req.headers.Authorization || req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user: any = await AuthService.getUser(token);
    const currentUser = user.Email || '';
    const currentCompany = user.Company || '';
    res.set('x-refresh-token', user.Token);

    return {
      currentUser,
      currentCompany,
      token: user.Token,
      services,
      res,
      req,
    };
  };

  private createApolloServer() {
    const graphqlRoutePrefix = process.env.IS_OFFLINE ? '' : '/prod';

    this.apolloServer = new ApolloServer({
      schema,
      context: this.context,
      dataSources: () => this.dataSources,
      playground: {
        endpoint: graphqlRoutePrefix + '/graphql',
      },
    });
    this.apolloServer.applyMiddleware({
      app: this.app,
      bodyParserConfig: {
        limit: '1000mb',
      },
    });

    this.app.get('/', (req, res) => {
      res.writeHead(200, {Connection: 'close'});
      res.end('Apollo GraphQL up and running...');
    });

    this.handler = serverless(this.app);
  }
}
