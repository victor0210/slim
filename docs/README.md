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
<script src="https://unpkg.com/slim-store/slim.min.js"></script>
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
import Slim from 'slim-store'

// state is single object
const state = {
    name: 'slim',
    age: 20
}

// reducers are event proxies
const reducers = {
    increment: (state) => {
        state.age += 1
    }
}

// getters are computed functions of state
const getters = {
  desc: state => `My name is : ${state.name}, I'm ${state.age}-years-old!`
}

// create store
const store = Slim.createStore({
    reducers,
    getters,
    state
})

// emit increment reducer
store.commit('increment')

console.log(store.state.count)
// output: 21

console.log(store.getGetter('desc'))
// output: My name is : slim, I'm 21-years-old!`
```

## Extensions

* [VSlim](/vslim.html): Slim-based state management framework in Vue.
* [RSlim](/rslim.html): Slim-based state management framework in React.
