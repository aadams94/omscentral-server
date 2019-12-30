export interface IGraphQLConfig {
  inspector: boolean;
}

export const config: IGraphQLConfig = {
  inspector: Boolean(process.env.OMSCENTRAL_GRAPHQL_INSPECTOR)
};
