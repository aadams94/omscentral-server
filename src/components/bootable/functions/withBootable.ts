import { Application } from 'express';
import { assign } from 'lodash';
import { Bootable } from '../models';
import { ILogger, IBootable } from '../interfaces';

/**
 * Decorator that injects bootable capabilities to an express app by adding
 * #phase and #boot methods that are used to register phases and boot the app.
 *
 * @param app
 * @param logger
 * @returns Bootable express app.
 */
export const withBootable = (app: Application, logger?: ILogger): IBootable => {
  const { boot, phase } = new Bootable(app, logger || console);

  return assign(app, {
    boot,
    phase,
  });
};
