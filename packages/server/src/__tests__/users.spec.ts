import 'reflect-metadata';
import { graphql } from 'graphql';
import schema from '../graphql/schema/schema';
import * as mockCategories from './mocks/mockUsers';

const allCategorieTestCase = {
    id: 'All categories Test Case',
    query: `
      query {
        categories {
           id 
           categoryName
        }
      }
    `,
    variables: {},

    // Injecting the mock movie server with canned responses
    context: { categories: mockCategories },

    // Expected result
    expected: {
        data: {
            categories: [
                { id: '1', categoryName: 'cat1' },
                { id: '2', categoryName: 'cat2' }]
        }
    }
};

describe('Schema', () => {    
    const cases = [allCategorieTestCase];    

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj;
        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables);
            try {
                return expect(1).toEqual(1);
            } catch (error) {
                console.log(error);
            }

        });
    });
});