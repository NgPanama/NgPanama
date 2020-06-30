import {CarsService} from '../services/cars/CarsService';
import {TrainsService} from '../services/trains/TrainsService';
import {EmailsService} from '../services';

export interface IAppContext {
  carsService: CarsService;
  trainsService: TrainsService;
  emailsService: EmailsService;
}
