import 'zone.js';
import 'reflect-metadata';
import { Server } from '../server';
import { AbstractLogger } from './logger/AbstractLogger';
import { AbstractSetting } from './config/AbstractSetting';
import { Setting } from './config/Setting';
import { Logger } from './logger/Logger';
import { TrainsService, CarsService, EmailsService } from '../services';
import { Injector, ReflectiveInjector } from 'injection-js';
import {
  UserDataSource
} from '../graphql/datasources';


const injector: Injector = ReflectiveInjector.resolveAndCreate([
  { provide: AbstractLogger, useClass: Logger },
  { provide: AbstractSetting, useClass: Setting },
  UserDataSource,
  CarsService,
  TrainsService,
  EmailsService,
  Server
]);

export default injector;
