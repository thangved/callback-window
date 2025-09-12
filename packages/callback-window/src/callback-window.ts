import {
  IStartCallbackWindow,
  IStartCallbackWindowOptions,
  IStartCallbackWindowResult,
} from './interfaces';

const DEFAULT_OPTIONS: Omit<IStartCallbackWindowOptions, 'url'> = {
  onBrowserNotAllowed(url) {
    window.location.href = url;
  },
  shouldClose(currentUrl) {
    return window.location.origin === new URL(currentUrl).origin;
  },
  timeout: Infinity,
  interval: 100,
};

export const startCallbackWindow: IStartCallbackWindow = (url, options) => {
  const { onBrowserNotAllowed, shouldClose, timeout, interval } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return new Promise<IStartCallbackWindowResult>(async (resolve, reject) => {
    try {
      const callbackWindow = window.open(url);
      const startedAt = Date.now();

      if (!callbackWindow) {
        return onBrowserNotAllowed(url);
      }

      for (;;) {
        try {
          const currentUrl = callbackWindow.window.location.href;
          const isShouldClose = await Promise.resolve(shouldClose(currentUrl));
          if (isShouldClose) {
            return resolve({ redirectedUrl: currentUrl });
          }
        } catch (error) {
        } finally {
          if (timeout !== Infinity) {
            const now = Date.now();
            if (startedAt + timeout >= now) {
              throw new Error('Timeout');
            }
          }

          if (callbackWindow.closed) {
            throw new Error('Window closed by user');
          }
          await new Promise((resolve) => setTimeout(resolve, interval));
        }
      }
    } catch (error) {
      reject(new Error('Start callback window failed', { cause: error }));
    }
  });
};
