import {QueryOutput} from 'aws-sdk/clients/dynamodb';
import NotFoundError from '../../lib/errors/NotFoundError';
import {DataSource} from 'apollo-datasource';
import {Injectable} from 'injection-js';
import AwsSdkFactory from '../../lib/factories/AwsSdkFactory';
import {DynamoDB} from 'aws-sdk';
import {v4 as uuidV4} from 'uuid';
import AuthService from '../../lib/auth';
import {User, LoginResponse, UserInput} from '../../interfaces/types';
import RegisteredUserError from '../../lib/errors/RegisteredUserError';
import {getDate} from '../../lib/timezone';

@Injectable()
export class UserDataSource extends DataSource {
  private dynamoDbDocumentClient: DynamoDB.DocumentClient;

  constructor() {
    super();
    this.dynamoDbDocumentClient = AwsSdkFactory.createDynamoDbDocumentClient();
  }

  public findAll = async () => {
    const params = {
      TableName: this.getUsersTableName(),
    };
    const dbResponse: QueryOutput = await this.dynamoDbDocumentClient.scan(params).promise();

    return dbResponse.Items;
  };

  public find = async (email: string) => {
    const params = {
      TableName: this.getUsersTableName(),
      IndexName: 'emailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
      ScanIndexForward: true,
      Limit: 1,
      ConsistentRead: false,
      Select: 'ALL_ATTRIBUTES',
    };

    const dbResponse: QueryOutput = await this.dynamoDbDocumentClient.query(params).promise();

    if (dbResponse.Items == null) {
      throw new NotFoundError();
    }

    if (dbResponse.Items.length === 0) {
      return {};
    }

    const user: User = dbResponse.Items[0];

    return user;
  };

  public register = async (user: UserInput): Promise<LoginResponse> => {
    const userProfile: User = await this.find(user.email);

    if (Object.keys(userProfile).length !== 0) {
      throw new RegisteredUserError();
    }
    const params = {
      TableName: this.getUsersTableName(),
      Item: {
        ...user,
        id: uuidV4(),
        passwordHash: await AuthService.generatePasswordHash(user.passwordHash),
      },
    };

    await this.dynamoDbDocumentClient.put(params).promise();

    const token = await AuthService.sign(user, '2d');
    const result: LoginResponse = {
      token,
      user: user as User,
    };

    return result;
  };

  public login = async (username: string, password: string) => {
    const user: User = await this.find(username);

    const passwordMatch = await AuthService.comparePassword(password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error('Contraseña Invalida');
    }

    if (!user.emailVerified) {
      throw new Error('Usuario no verificado');
    }

    const token = await AuthService.sign(user as UserInput, '1d');

    const result: LoginResponse = {
      token,
      user,
    };

    return result;
  };

  public activate = async (username: string, password: string) => {
    const user: User = await this.find(username);
    const params = {
      TableName: this.getUsersTableName(),
      Key: {
        id: user.id,
      },
      UpdateExpression: 'set passwordHash = :pw, updatedAt=:ed, emailVerified=:ev',
      ExpressionAttributeValues: {
        ':pw': await AuthService.generatePasswordHash(password),
        ':ed': getDate(),
        ':ev': true,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    await this.dynamoDbDocumentClient.update(params).promise();
  };

  /**
   * Acquire the name of the user table of the execution environment
   *
   * @returns {string}
   */
  private getUsersTableName(): string {
    const userTableName = process.env.USERS_TABLE_NAME;

    return typeof userTableName === 'string' ? userTableName : '';
  }
}
