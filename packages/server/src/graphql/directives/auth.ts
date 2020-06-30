import { SchemaDirectiveVisitor } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import { UserDataSource } from '../datasources';

export class IsAuthUserDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const userDataSource = new UserDataSource();
      const context = args[2];
      if (!context.currentUser && !process.env.IS_OFFLINE) {
        throw new Error('Requiere Autenticación');
      }

      // const usr = await userDataSource.find(context.currentUser);
      // if (usr.desabled) {
      //   throw new Error('Usuario deshabilitado');
      // }

      return resolve.apply(this, args);
    };
  }
}
