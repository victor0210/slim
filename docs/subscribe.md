# Subscribe/UnSubscribe

## 简介
subscribe是在store的非创建阶段注册reducer的方法，对应unSubscribe方法取消订阅

## 使用subscribe/unSubscribe

依然以计数器为例

```javascript
import { createStore } from 'slim'

const state = {
    count: 0
}

const counters = {
    increment: (state, draft) => {
        draft.count++
    }
}

const store = createStore({
    ...counters
}, slim)

store.dispatch('decrement') // nothing action

store.subscribe('decrement', (state, draft) => {
    draft.count -= 1
})

store.dispatch('decrement') // emit decrement, count would be -1

store.unSubscribe('decrement')  // remove "decrement" reducer

store.dispatch('decrement') // nothing action
```
