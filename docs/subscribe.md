# Subscribe/UnSubscribe

**subscribe** is a method of registering **Reducer** in the non-creation phase of **Store**, unsubscribing corresponding to **unsubscribe** method

## Usage

```javascript
import { createStore } from 'slim'

const state = {
    count: 0
}

const counters = {
    increment: (state) => {
        state.count++
    }
}

const store = createStore({
    reducers: counters,
    state
})

store.dispatch('decrement') // nothing action

store.subscribe('decrement', (state) => {
    state.count -= 1
})

store.dispatch('decrement') // emit decrement, count would be -1

store.unsubscribe('decrement')  // remove "decrement" reducer

store.dispatch('decrement') // nothing action
```
