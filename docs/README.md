---
home: true
heroImage: /logo.png
heroText: Slim
tagline: Centralized State Management With Proxy, State-Non-Editable.
actionText: QuickStart →
actionLink: /intro
features:
- title: State-Readonly
  details: Don't worry about the state's unpredictable mutation because the state can only be modified inside the reducer.
- title: Single-Source
  details: The state is centrally stored and is easy to initial in the isomorphic application.
- title: Easy-Integrated
  details: State hooks are easy to integrate quickly into mainstream frameworks such as Vue.
footer: MIT Licensed | Copyright © 2018-present Victor
---

## Usage

### Installation

```bash
npm install slim-store
```

### Use in code

```javascript
// state is single object
import {createStore} from 'slim'

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
const store = createStore({
    reducers,
    state
})

// emit increment reducer
store.dispatch('increment')

console.log(store.getState().count)
// output: 1
```
