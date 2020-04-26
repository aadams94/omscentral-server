export function enumName<TEnum, TValue>(enu: TEnum, value: TValue): string {
  const entries: [string, TValue][] = Object.entries(enu);
  const match = entries.find((entry) => value === entry[1]) || [];
  return match && match[0].replace(/([A-Z])/g, ' $1').trim();
}
