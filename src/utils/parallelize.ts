type Fn<T> = (value: T) => Promise<T>;

export function parallelize<T>(...args: Fn<T>[]): (value: T) => Promise<T> {
  return (value: T) => Promise.all(args.map(fn => fn(value))).then(() => value);
}
