import {SchemaDirectiveVisitor} from '@graphql-tools/utils';
import {defaultFieldResolver, GraphQLString} from 'graphql';
import {formatDate} from '../../lib/timezone';

export class FormattableDateDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const {resolve = defaultFieldResolver} = field;
    const {defaultFormat} = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString,
    });

    field.resolve = async function (source, {format, ...otherArgs}, context, info) {
      const date = await resolve.call(this, source, otherArgs, context, info);

      if (!date) {
        return null;
      }

      return formatDate(date, format || defaultFormat);
    };

    field.type = GraphQLString;
  }
}
