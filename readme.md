## Install

```sh
npm install tweetlite-automate
```

## Usage

```sh
tweetlite use --src=~/.tweetlite/node_modules/tweetlite-automate --account=johndoe --interval="5 hours" --message="$(cat welcome.txt)"
```
## Module Usage

```js
import TweetLite from 'tweetlite-core';
import automate from 'tweetlite-automate';

const automate = automate.use();
const TT = new TweetLite({conf});

automate.call(TT, {
	interval:'5 hours',
	message:` Hello World`;
})

```
