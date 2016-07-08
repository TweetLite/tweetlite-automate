## Install

```sh
npm install twitbot-automate
```

## Usage

```sh
twitbot use --src=~/.twitbot/node_modules/twitbot-automate/ --account=johndoe --interval="5 hours" --message="$(cat welcome.txt)"
```
## Module Usage

```js
import Twitbot from 'twitbot-core';
import automate from 'twitbot-automate';

const automate = automate.use();
const TT = new Twitbot({conf});

automate.call(TT, {
	interval:'5 hours',
	message:` Hello World`;
})

```
