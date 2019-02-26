# Plugin

In order to integrate **Slim** into various popular frameworks, it is more conducive to the expansion of the program. **Slim** provides a plug-in mechanism.

## Usage

The plugin is very simple to use, just add **Plugin** when registering.

```javascript
const store = Slim.createStore({
    plugin: loggerPlugin
})
```

Multiple plugins use array wrappers.

```javascript
const store = Slim.createStore({
    plugin: [loggerPlugin, capturePlugin]
})
```

## Writing a plugin

**Slim** is also very simple to write plugins. Multiple **Plugin** will be executed in the order of registration

* `init`：Executed when the plugin registration is initialized, receiving a parameter `store`
* `before` and `after`: respectively before and after the reducer is executed, receiving two parameters `state` and `action`
* `beforeSet`: Triggered when setting a new value, receiving four parameters `target`, `property`, `value`, and `receiver`. For details, refer to [Proxy.set](https://developer.mozilla. Org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)

:::warning
`init` running once with store creat. Plugin usage is sequential, and the results affect each other, but don't feel free to manipulate **State** in **Plugin** before ensuring that the operation is harmless. In general, please read **State** in **Plugin** and put the operation in **Reducer**.
:::

Injection with **Store** creating. 

```javascript
import Slim from 'slim-store'

const state = {
    count: 0
}

const counters = {
    increment: (state) => {
        state.count++
    }
}

const counterPlugin = {
	init(store) {
 	    // inject events
	},
    before(state, action) {
        if (action === 'increment') {
            console.log('before count change', state.count)
        }
    },
    beforeSet(target, property, value, receiver) {
        console.log(target, property, value, receiver)
    },
    after(state, action) {
        if (action === 'increment') {
            console.log('after count change', state.count)
        }
    }
}

const store = Slim.createStore({
    reducers: counters,
    state: state,
    plugin: [counterPlugin]
})

store.commit('increment')

// output: before count change 0
// output: after count change 1
```

Injection before **Store** created.

```javascript
Slim.use(somePlugin)

const store = Slim.createStore(...)
``` 

## Plugins integrated with Slim 
* [VSlim](/vslim.html): Slim-based state management framework in Vue.
* [RSlim](/rslim.html): Slim-based state management framework in React.
