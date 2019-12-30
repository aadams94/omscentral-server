/**
 * Phase callback, which is used by asynchronous phases to signal phase end.
 */
export type PhaseCallback = (error?: Error) => void;
