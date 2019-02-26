# Action

**Action** is a data change logic control layer abstracted by **Slim**, mainly controlling the trigger logic of **Reducer**, and can also control asynchronous here.

:::tip
In most cases, you may only need to trigger **Reducer** directly, **Action** may not, but **Reducer** must be.
:::

## Design action
In **Slim**, a **Action** is defined as a key-value pair. Let's see how to implement a **Action**. In our simple counter application, we want to have two things:

Let's see how to implement a **Action**. In our simple counter application, we want to have two things:

* Increase the count: increment
* Reduce count: decrement

```javascript
import Slim from 'slim-store'

const state = {
    count: 0
}

const reducers = {
    increment: (state) => {
        // increment count
    },
    decrement: (state) => {
        // decrement count
    }
}

const actions = {
    increment: (context) => {
        if (context.state.count < 10) context.commit('increment')
    },
    decrement: ({state, commit}) => {
        if (state.count > 0) commit('decrement')
    }
}

const store = Slim.createStore({
    reducers,
    actions,
    state
})

store.dispatch('increment')
```

Executing **Action** is very simple, just execute `store.dispatch(actionType, ...arguments)`.

## Support Async

```javascript
import Slim from '../../src/slim/index'

const state = {
  count: 0
}

const reducers = {
  decrement: (state, decrementNum) => {
    // computed new state
    let count = state.count - (decrementNum || 1)

    // reduce new state
    return {
      ...state,
      count
    }
  }
}

const actions = {
  decrement ({commit}, decrementNum) {
    sleeper(decrementNum)
      .then(decrementNum => commit('decrement', decrementNum))
  },
  
  // or async/await
  async decrement ({commit}, decrementNum) {
    const decrementNum = await sleeper(decrementNum)
    commit('decrement', decrementNum)
  },
}

const sleeper = (decrementNum) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Math.abs(decrementNum))
    }, 1000)
  })
}

const plugin = {
  after(state) {
    renderCount(state.count)
  }
}

const store = Slim.createStore({
  reducers,
  actions,
  state,
  plugin: [plugin]
})

store.dispatch('decrement', -5)
// decrement 5 after 1000ms
// output: -5
```
