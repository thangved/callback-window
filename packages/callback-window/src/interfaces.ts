export interface IStartCallbackWindowOptions {
  /**
   * Url to open
   */
  url: string;
  /**
   * Time to close window in milliseconds
   */
  timeout?: number;
  /**
   * The window checker should be closed. By default, the window will close when the origin of the window equals the origin of the parent window.
   * @param currentUrl - current url of the opened window
   */
  shouldClose?: (currentUrl: string) => boolean | Promise<boolean>;
  /**
   * What to do when browser does not allow opening new windows, by default will change the current window address to the destination address
   * @param url
   */
  onBrowserNotAllowed?: (url: string) => {};
}

export interface IStartCallbackWindowResult {
  redirectedUrl: string;
}

export interface IStartCallbackWindow {
  (options: IStartCallbackWindowOptions): Promise<IStartCallbackWindowResult>;
}
