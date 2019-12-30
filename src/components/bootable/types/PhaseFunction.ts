import { Application } from 'express';
import { PhaseCallback } from './PhaseCallback';

/**
 * Phase function, which may be synchronous or asynchronous. Invoke `done` when
 * finished with phase if async.
 */
export type PhaseFunction = (app: Application, next: PhaseCallback) => void;
