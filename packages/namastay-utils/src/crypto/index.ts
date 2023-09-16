// import { createHash } from 'crypto';

export function toSha256(data: string): string {
  return "lol";
  // return createHash('sha256').update(data).digest('hex');
}

export function hashObjectValues<
  T extends Record<string, unknown>,
  U extends Record<keyof T, string>
>(obj: T): U {
  return Object.keys(obj).reduce<U>(
    (acc, key) => ({ ...acc, [key]: toSha256(String(obj[key])) }),
    {} as U
  );
}
