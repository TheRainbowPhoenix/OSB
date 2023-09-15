type Message = { type: string; payload?: unknown };

export const sendMessageToSdk = ({ type, payload }: Message): void => {
  if (!window?.top) throw new Error('Top window not detected.');
  window.top.postMessage({ type, payload }, '*');
};

/**
 * Listens to the SDK messages specified.
 * Always use a memoized messages to avoid infinite re-renders.
 * @param {{ [key: string]: (payload: unknown) => void }} messages
 */
