export const getLocalStorageItem = (key: string): string | undefined => {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const item = localStorage.getItem(key);
      return item !== null ? item : undefined;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Error getting localStorage item: ', e);
  }

  return undefined;
};

export const setLocalStorageItem = (key: string, value: string) => {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Error setting localStorage item: ', e);
  }
};

export const removeLocalStorageItem = (key: string) => {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      localStorage.removeItem(key);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Error removing localStorage item: ', e);
  }
};
