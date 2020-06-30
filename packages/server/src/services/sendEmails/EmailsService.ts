import {Car} from '../../interfaces/types';
import {AbstractLogger} from '../../core/logger/AbstractLogger';
import {Injectable} from 'injection-js';
import {SesClient} from '../../lib/ses/SesClient';
import SesOptions from '../../lib/ses/SesOptions';

@Injectable()
export class EmailsService {
  private url: string = 'http://dev.mapxplor.com/#/profiles/activate/';
  constructor(private logger: AbstractLogger) {}

  public sendWelcome(userEmail: string, token: string) {
    const sesClient = new SesClient();
    const options: SesOptions = {
      toEmailAddresses: [userEmail],
      sourceEmail: 'noreply@mapxplor.com',
      template: 'Welcome',
      variables: {link: this.url.concat(token)}
    };

    console.log(options);

    return sesClient.sendbySESTemplate(options);
  }
}
