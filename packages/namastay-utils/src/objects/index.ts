// TODO: improve this (use uuid-v4 maybe)
export const generateRandomUniqueId = (): string =>
  `000000000${Math.random().toString(36).substring(2, 9)}`.slice(-9);
