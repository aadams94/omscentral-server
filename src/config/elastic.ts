export interface IElasticConfig {
  enabled: boolean;
  hostIdentifier: string;
  apiKey: string;
  engineName: string;
}

export const config: IElasticConfig = {
  enabled: Boolean(process.env.OMSCENTRAL_ELASTIC_ENABLED),
  hostIdentifier: process.env.OMSCENTRAL_ELASTIC_HOST_IDENTIFIER,
  apiKey: process.env.OMSCENTRAL_ELASTIC_API_KEY,
  engineName: process.env.OMSCENTRAL_ELASTIC_ENGINE_NAME
};
