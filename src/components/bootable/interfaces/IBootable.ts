import { Application } from 'express';
import { PhaseFunction, BootFunction } from '../types';

export interface IBootable extends Application {
  /**
   * Registers a phase.
   */
  phase: (func: PhaseFunction, name: string) => void;

  /**
   * Boots up the application, running all phases in the order registered.
   */
  boot: (callback: BootFunction) => void;
}
