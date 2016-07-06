## Install

```sh
npm install twitbot-automate
```

## Usage

```sh
twitbot use --src=~/.twitbot/twitbot-automate --account=johndoe --interval="5 hours" --message="Hello World!"
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
