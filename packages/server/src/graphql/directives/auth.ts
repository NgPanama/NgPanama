import {SchemaDirectiveVisitor} from '@graphql-tools/utils';
import {defaultFieldResolver} from 'graphql';

export class IsAuthUserDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const {resolve = defaultFieldResolver} = field;
    field.resolve = async function (...args) {
      const context = args[2];
      if (!context.currentUser && !process.env.IS_OFFLINE) {
        throw new Error('Requiere Autenticación');
      }

      return resolve.apply(this, args);
    };
  }
}
