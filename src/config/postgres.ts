export interface IPostgresConfig {
  connection: string;
}

export const config: IPostgresConfig = {
  connection:
    process.env.OMSCENTRAL_POSTGRES_CONNECTION || process.env.DATABASE_URL
};
