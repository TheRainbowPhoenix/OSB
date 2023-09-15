/* eslint-disable no-await-in-loop */
export const timeout = async (
  ms: number,
  callback?: () => void
): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(callback?.());
    }, ms);
  });

export const repeatWithTimeout = async <T>(
  fn: () => Promise<T>,
  ms: number,
  repeats: number,
  continueStatus: number
): Promise<T | undefined> => {
  let tries = 0;
  let result;

  while (repeats > tries) {
    try {
      await timeout(ms);
      tries += 1;
      result = await fn();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status !== continueStatus) {
        throw error;
      }
    }
  }

  if (!result) {
    throw new Error('No Data Returned.');
  }

  return undefined;
};
