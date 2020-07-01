import {Injector} from 'injection-js';
import {EmailsService, TrainsService, CarsService} from './services';
import {IAppContext} from './interfaces/IAppContext';

export function getContext(injector: Injector): IAppContext {
  return {
    carsService: injector.get(CarsService),
    trainsService: injector.get(TrainsService),
    emailsService: injector.get(EmailsService),
  };
}
