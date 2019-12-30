const hourToMs = (hours: number): number => hours * 60 * 60 * 1000;

export interface ISessionConfig {
  /**
   * The secret used to sign the session ID cookie.
   *
   * @see https://www.npmjs.com/package/express-session#secret
   */
  secret: string;

  /**
   * Milliseconds after which the session ID cookie is considered expired.
   *
   * @see https://www.npmjs.com/package/express-session#cookiemaxage
   */
  maxAge: number;

  /**
   * Milliseconds between clearing expired sessions.
   *
   * @see https://www.npmjs.com/package/connect-session-knex#options
   */
  clearInterval: number;
}

export const config: ISessionConfig = {
  secret: process.env.OMSCENTRAL_SESSION_SECRET || 'shhhhhhhhh',
  maxAge: hourToMs(Number(process.env.OMSCENTRAL_SESSION_MAX_AGE) || 8),
  clearInterval: hourToMs(
    Number(process.env.OMSCENTRAL_SESSION_CLEAR_INTERVAL) || 1
  )
};
