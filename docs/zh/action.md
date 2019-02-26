# Action

**Action**是**Slim**抽象出来的一个数据变化逻辑控制层，主要是控制**Reducer**的触发逻辑，也可以在这里控制异步。

:::tip 提示
大多数情况下，可能只需要直接触发**Reducer**即可，**Action**可以没有，但是**Reducer**必须有。
:::

## 设计action
在**Slim**中，一个**Action**以一个键值对的方式定义，接下来让我们看看如何实现一个**Action**。在我们一个简单的计数器应用中，我们希望有两种操作：

接下来让我们看看如何实现一个**Action**。在我们一个简单的计数器应用中，我们希望有两种操作：

* 增加计数：increment
* 减少计数：decrement

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

执行**Action**非常简单，执行`store.dispatch(actionType, ...arguments)`即可。

## 操作异步

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
  
  // 或者使用 async/await
  async decrement ({commit}, decrementNum) {
    const decrementNum = await sleeper(decrementNum)
    commit('decrement', decrementNum)
  },
}

const sleeper = (decrementNum) => {
  // 取绝对值
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
