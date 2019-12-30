declare module 'objection-graphql' {
  import { Model, QueryBuilder } from 'objection';
  import { GraphQLObjectType, GraphQLSchema, GraphQLType } from 'graphql';

  export function builder(): SchemaBuilder;

  interface IModelOptions {
    listFieldName?: string;
    fieldName?: string;
  }

  type ArgFactory = () => {
    [key: string]: {
      type: GraphQLType;
      query: (query: QueryBuilder<Model>, value: any) => QueryBuilder<Model>;
    };
  };

  export class SchemaBuilder {
    model(modelClass: any, opt?: IModelOptions): this;
    extendWithMutations(mutations: GraphQLObjectType | Function): this;
    argFactory(factory: ArgFactory): this;
    build(): GraphQLSchema;
  }
}
