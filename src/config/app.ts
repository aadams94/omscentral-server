import { split } from 'lodash';

import { root } from '../constants';

export type Environment = 'local' | 'test' | 'staging' | 'production';

export interface AppConfig {
  release: string;
  environment: Environment;
  name: string;
  port: number;
  corsWhitelist: string[];
}

export const config: AppConfig = {
  // eslint-disable-next-line security/detect-non-literal-require
  release: require(`${root}/package.json`).version,
  environment: process.env.NODE_ENV as Environment,
  name: process.env.OMSCENTRAL_NAME,
  port: Number(process.env.PORT),
  corsWhitelist: split(process.env.OMSCENTRAL_CORS_WHITELIST, ','),
};
