import * as lambda from 'aws-lambda';
import * as AWS from 'aws-sdk';
import SesOptions from './SesOptions';

export class SesClient {
  public SendbySES(options: any, callback: lambda.Callback) {
    /* AWS.config.update({
            
        }); */

    const ses = new AWS.SES();

    const bccEmailAddresses = options.bccEmailAddresses;
    const ccEmailAddresses = options.ccEmailAddresses;
    const toEmailAddresses = options.toEmailAddresses;
    const bodyData = options.bodyData;
    const bodyCharset = options.bodyCharset;
    const subjectdata = options.subjectdata;
    const subjectCharset = options.subjectCharset;
    const sourceEmail = options.sourceEmail;
    const replyToAddresses = options.replyToAddresses;

    const emailParams = {
      Destination: {
        BccAddresses: bccEmailAddresses,
        CcAddresses: ccEmailAddresses,
        ToAddresses: toEmailAddresses,
      },
      Message: {
        Body: {
          Text: {
            Data: bodyData,
            Charset: bodyCharset,
          },
        },
        Subject: {
          Data: subjectdata,
          Charset: subjectCharset,
        },
      },
      Source: sourceEmail,
      ReplyToAddresses: replyToAddresses,
    };

    ses.sendEmail(emailParams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        callback(err, undefined);
      } else {
        console.log('SES successful');
        console.log(data);

        callback(undefined, true);
      }
    });
  }

  public sendbySESTemplate = async (options: SesOptions) => {
    const ses = new AWS.SES();
    const emailParams = {
      Template: options.template,
      Destination: {
        ToAddresses: options.toEmailAddresses,
      },
      Source: options.sourceEmail,
      TemplateData: JSON.stringify(options.variables),
    };
    console.log(emailParams);

    return ses.sendTemplatedEmail(emailParams).promise();
  };
}
