# Callback window

> A simple handler for external website window callback

## Install

Install this package via npm

```sh
npm i @thangved/callback-window
```

Or via yarn

```sh
yarn add @thangved/callback-window
```

## Usage

```ts
import { startCallbackWindow } from '@thangved/callback-window';

const handleCallback = async () => {
  try {
    const { redirectedUrl } = await startCallbackWindow(
      'https://redirect.thangved.com/?redirect_uri=https://profile.thangved.com',
    );

    console.log(redirectedUrl); // https://profile.thangved.com
  } catch (error) {
    console.log(error);
  }
};
```

## Options

| Option                | Type                                                  | Default    | Description                                                                                                                                 |
| --------------------- | ----------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `timeout`             | `number`                                              | `Infinity` | Time to close window in milliseconds                                                                                                        |
| `interval`            | `number`                                              | `100`      | Time to check current URL in milliseconds                                                                                                   |
| `shouldClose`         | `(currentUrl: string) => boolean \| Promise<boolean>` | –          | The window checker should be closed. By default, the window will close when the origin of the window equals the origin of the parent window |
| `onBrowserNotAllowed` | `(url: string) => void`                               | –          | What to do when the browser does not allow opening new windows; by default changes the current window address to the destination address    |
