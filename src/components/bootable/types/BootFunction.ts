/**
 * Boot function, which may receive an error if bootup fails for some reason.
 */
export type BootFunction = (error?: Error) => void;
