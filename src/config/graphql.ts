export interface GraphQLConfig {
  inspector: boolean;
}

export const config: GraphQLConfig = {
  inspector: Boolean(process.env.OMSCENTRAL_GRAPHQL_INSPECTOR),
};
