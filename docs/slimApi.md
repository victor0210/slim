# Slim Top-Level API

Slim is the entry point to the Slim library. If you load Slim from a Script tag, Slim can use these top-level APIs globally.
If you use ES6 and npm, `impoart Slim from 'slim-store'`.
If you use ES5 and npm, `var Slim = require('slim-store')`.

## Overview

Create a Store instance.
* [Slim.createStore](/slimApi.html#slim-createstore)
* **Spec: optional parameters when creatingStore**
    * [Spec.state](/slimApi.html#spec-state)
    * [Spec.actions](/slimApi.html#spec-actions)
    * [Spec.reducers](/slimApi.html#spec-reducers)
    * [Spec.getters](/slimApi.html#spec-getters)
    * [Spec.mode](/slimApi.html#spec-mode)
    * [Spec.plugin](/slimApi.html#spec-plugin)

Inject the plugin.
* [Slim.use](/slimApi.html#slim-use)

Event center related.
* [Slim.on](/event.html#on-eventname-callback)
* [Slim.off](/event.html#emit-eventname-args)
* [Slim.emit](/event.html#off-listener)

**Store** instance API.
* [Store.dispatch](/slimApi.html#store-dispatch)
* [Store.commit](/slimApi.html#store-commit)
* [Store.getGetter](/slimApi.html#store-getgetter)
* [Store.state](/state.html)

## Reference

### Slim.createStore
`Slim.createStore(Spec)` creates and returns a **Store** instance.

```javascript
const store = Slim.createStore(spec)
```

### Spec
`Spec` is a configuration object passed in `Slim.createStore`

```javascript
const store = Slim.createStore(spec)
```


### Slim.use
`Slim.use(plugin)` is a more flexible plugin injection method before **Store** is created.

```javascript
import Slim from 'slim-store'

let plugin = {
    init(store) {
      console.log('init')
    }
}

Slim.use(plugin)
```

### Store.dispatch
`Store.dispatch(actionType, ...args)` Trigger **Action**. [More about Action](/action.html).

```javascript
import Slim from 'slim-store'

const actions = {
  increment: (context, ...args) => {
    console.log('action increment fire')
  }
}

const store = Slim.createStore({
  actions
})

store.dispatch('increment')
// output: action increment fire
```

### Store.commit
`Store.commit(reducerKey, ...args)` Trigger **Reducer**. [More about Reducer](/reducer.html).

```javascript
import Slim from 'slim-store'

const reducers = {
  increment: (state, ...args) => {
    console.log('action increment fire')
  }
}

const store = Slim.createStore({
  reducers
})

store.commit('increment')
// output: action increment fire
```

### Store.getGetter
`Store.getGetter(getterKey)` is a combination of state methods. [More about getGetter](/state.html#get-state).

```javascript
import Slim from 'slim-store'

const state = {
  firstName: 'slim',
  lastName: 'store'
}

const getters = {
  fullName: ({firstName, lastName}) => firstName + ' ' + lastName 
}

const store = Slim.createStore({
  state,
  getters
})                  

const username = store.getGetter('username')

console.log(username)   
// output: slim store
```

### Spec.state
`Spec.state` is a single object data source

```javascript
const state = {
  level1: {
    key1OfLevel1: 11
  },
  level2: {
    key1OfLevel2: 12
  }
}
```

### Spec.actions
`Spec.actions` is the key-value pair of the method. The callback receives multiple parameters, the first parameter is the current **Store** context

```javascript
const actions = {
  actionType: (context, ...args) => {
    store.commit('actionType', ...args)
  }
}
```

### Spec.reducers
`Spec.reducers` is the key-value pair of the method. The callback receives multiple parameters, the first parameter is the **State registered under the current **Store**

```javascript
const reducers = {
  reducerKey: (state, arg1, arg2) => {
    state.someKey = arg1 + arg2
  }
}
```

### Spec.getters
`Spec.getters` is the key-value pair of the method. The callback receives a parameter, **State** registered under **Store**

```javascript
const getters = {
  fullName: ({firstName, lastName}) => firstName + ' ' + lastName
}
```

### Spec.mode
`Spec.mode` is the data restriction mode, optional values: `"strict" (default)` and `"loose"`, [more about Mode](/controlLevel.html)

### Spec.plugin
`Spec.plugin` is a collection of injection plugins of type array, [more about Plugin](/plugin.html).
