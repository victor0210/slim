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

**Slim** is also very simple to write plugins. The plugin provides three api `init`、`before` and `after`, which are used before and after the reducer to receive two parameters `state` and `action`, multiple **Plugin** will be executed in the order of registration

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

store.dispatch('increment')

// output: before count change 0
// output: after count change 1
```

Injection before **Store** created.

```javascript
Slim.use(somePlugin)

const store = Slim.createStore(...)
``` 

## Plugins integrated with Slim 
* [vslim (Slim-based state management framework in Vue)](/vslim.html)
