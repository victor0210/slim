# API

### Slim.use
Apply plugin, receive a plugin object, only add one plugin at a time

```javascript
Slim.use(slimPlugin)
```

## Slim.createStore
**Slim** currently exposes only one interface: `createStore`, passing in a parameter `conf` object

```javascript
const store = Slim.createStore({
    reducers,                   // default {}
    state,                      // default {}
    plugin,
    getters,                    // default {}
    mode                        // default 'strict'
})
```

### reducers
**reducers** is a series of methods that will receive a default parameter **state** and the rest of the custom parameters. The parameters passed in **dispatch** will be received via args. See [Reducer](/reducer for details) .html)

```javascript
const reducers = {
    reducerKeyForDispatch: callback(state, ...args) 
}
```

### state
**state** is a single object stored in one state. See [State](/state.html) for details.

```javascript
const state = {
    user: {
        name: 'victor',
        age: 18
    },
    todos: [
        {
            content: 'one',
            status: 'done'
        }
    ]
}
```

### plugin
**plugin** is a simple object that provides `before` and `after` execution cycle hooks to access two parameters `state` and `action`. See [Plugin] for details (/plugin.html )

```javascript
const slimPlugin = {
    before(store) {},
    before(state, action) {},
    after(state, action) {}
}
```

### getters
**getters** is a more convenient way to construct state-specific data fetches provided by **Slim**. Used with `store.getState('getterKey')`, each getter must be a function that accepts unique parameters. State`,
See [Getters](/state.html#getters) for details.

```javascript
const getters = {
    username: ({user}) => user.name 
}
```

### mode
**mode** determines the limit level of **Slim**, optional two values ​​`strict` and `loose`, default: `strict`, what is the difference between the two values?

* **strict**: Use Proxy to listen to the data, the limit is very strong, and it is not allowed to modify any data anywhere the reducer accidentally
* **loose**: Unlimited, it is recommended to use in production environment

## Store
**store** is an overall control instance created and returned by **createStore**

```javascript
import Slim from 'slim-store'

const store = Slim.createStore(...)

// store: {
//     dispatch,                    emit reducer
//     getState,                    get the newest state or alias
//     state,                       state
//     on                           EventCenter.on
//     off                          EventCenter.off
//     emit                         EventCenter.emit
// }
```

### dispatch
**dispatch** triggers the reducer to execute. The first parameter is the key corresponding to the reducer. You can add multiple custom parameters later.

```javascript
// 'sayHello' should receive custom parameters like this
const reducers = {
    sayHello: (state, name, age, location) {...}
}

store.dispatch('sayHello', name, age, location)

// with chain
store.dispatch('one')
  .dispatch('two')
  .dispatch('three')
```

### getState
Get the latest state, fill in the parameter `getterKey`

```javascript
// get all state
const state = store.getState()                  

// To get the state value corresponding to the alias, you need to register the alias in advance, and return undefined if the alias does not exist.
const username = store.getState('username')     
```

### on / off / emit
[EventCenter](/event.html)
