---
home: true
heroImage: /logo.png
heroText: Slim
tagline: Centralized State Management With Proxy, State-Non-Editable.
actionText: QuickStart →
actionLink: /intro
features:
- title: Exquisite
  details: Simple API and tiny volume。
- title: Strong-Restriction
  details: State updates are completely limited to reducers, and centralized management of update operations makes state changes more predictable。
- title: Independently
  details: Running independently of any framework.
footer: MIT Licensed | Copyright © 2019-present Victor
---

:::tip
Slim can be applied to any framework because it does not depend on any framework. Integration to frameworks will very easy by using [Plugin](/plugin.html).
:::

## Installation

### CDN
```html
<script src="https://unpkg.com/slim-store@1.0.0/slim.min.js"></script>
```

### NPM

```bash
npm install slim-store
```

### Yarn
```bash
yarn add slim
```

## Usage

```javascript
// state is single object
import Slim from 'slim-store'

const state = {
    count: 0
}

// reducers is event proxy
const reducers = {
    increment: (state) => {
        state.count += 1
    }
}

// create store
const store = Slim.createStore({
    reducers,
    state
})

// emit increment reducer
store.dispatch('increment')

console.log(store.state.count)
// output: 1
```

## Extensions

* [VSlim](/vslim.html): Slim-based state management framework in Vue.
