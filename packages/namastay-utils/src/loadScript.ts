type CachedScripts = { [src: string]: Promise<void> };
const cachedScripts: CachedScripts = {};
/**
 * Asynchronously loads a script keeping track of which scripts have already
 * requested and loaded.
 *
 * Multiple requests to the same resource will return the same promise.
 *
 * @param src Script URL to load
 */
export const loadScript = (src: string): Promise<void> => {
  const existing = cachedScripts[src];

  if (existing) {
    return existing;
  }
  const promise = new Promise<void>((resolve, reject) => {
    // Create script
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // Script event listener callbacks for load and error
    const onScriptLoad = (): void => {
      resolve();
    };
    const onScriptError = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      cleanup();
      // Remove from cachedScripts so that we can try loading again
      delete cachedScripts[src];
      script.remove();
      reject(new Error(`Unable to load script ${src}`));
    };

    const cleanup = (): void => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    // Add script to document body
    document.body.appendChild(script);

    // Remove event listeners on cleanup
  });

  cachedScripts[src] = promise;

  return promise;
};
