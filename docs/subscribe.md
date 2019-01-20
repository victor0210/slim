# Subscribe/UnSubscribe

## 简介
**subscribe**是在**Store**的非创建阶段注册**Reducer**的方法，对应**unsubscribe**方法取消订阅

## 使用subscribe/unSubscribe

依然以计数器为例

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
