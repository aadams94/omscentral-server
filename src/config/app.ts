import { split } from 'lodash';

export type Environment = 'local' | 'test' | 'staging' | 'production';

export interface IAppConfig {
  environment: Environment;
  name: string;
  port: number;
  corsWhitelist: string[];
}

export const config: IAppConfig = {
  environment: process.env.NODE_ENV as Environment,
  name: process.env.OMSCENTRAL_NAME,
  port: Number(process.env.PORT),
  corsWhitelist: split(process.env.OMSCENTRAL_CORS_WHITELIST, ','),
};
