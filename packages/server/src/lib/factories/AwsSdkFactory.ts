import * as AWS from 'aws-sdk';
import DocumentClient = AWS.DynamoDB.DocumentClient;
import Environment from '../infrastructures/Environment';

/**
 * AwsSdkFactory
 *
 */
export default class AwsSdkFactory {
  /**
   * Generate DynamoDB.DocumentClient
   *
   * @returns {DynamoDB.DocumentClient|DocumentClient}
   */
  public static createDynamoDbDocumentClient(): DocumentClient {
    if (Environment.isLocal() === true) {
      // I need to pass it as DocumentClientOptions Interface
      const documentClientOptions = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'AKIAJP7INTXOXDMDXVIA',
        secretAccessKey: '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',
      };

      return new AWS.DynamoDB.DocumentClient(documentClientOptions);
    }

    return new AWS.DynamoDB.DocumentClient();
  }
}
