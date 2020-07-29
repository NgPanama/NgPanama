import * as path from 'path';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {GraphQLSchema} from 'graphql';
import {schemaDirectives} from '../directives';
import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';
import {loadFilesSync} from '@graphql-tools/load-files';

const typesArray = loadFilesSync(path.join(__dirname, '../types'), {recursive: true});
const resolversArray = loadFilesSync(path.join(__dirname, '../resolvers'));
const allTypes = mergeTypeDefs(typesArray);
const allResolvers = mergeResolvers(resolversArray);
let schema: GraphQLSchema;
schema = makeExecutableSchema({
  typeDefs: allTypes,
  resolvers: allResolvers,
  schemaDirectives,
});

export default schema;
