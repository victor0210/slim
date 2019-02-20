# Slim Top-Level API

Slim是Slim库的入口点。 如果从Script标签加载Slim，则Slim全局可以使用这些顶级API。
如果你使用ES6和npm，`import Slim from 'slim-store'`。
如果你使用ES5和npm，`var Slim = require('slim-store')`。

## Overview

创建Store实例.
* [Slim.createStore](/zh/slimApi.html#slim-createstore)
* **Spec：createStore时的可选参数**
    * [Spec.state](/zh/slimApi.html#spec-state)
    * [Spec.actions](/zh/slimApi.html#spec-actions)
    * [Spec.reducers](/zh/slimApi.html#spec-reducers)
    * [Spec.getters](/zh/slimApi.html#spec-getters)
    * [Spec.mode](/zh/slimApi.html#spec-mode)
    * [Spec.plugin](/zh/slimApi.html#spec-plugin)

注入插件.
* [Slim.use](/zh/slimApi.html#slim-use)

事件中心相关.
* [Slim.on](/zh/event.html#on-eventname-callback)
* [Slim.off](/zh/event.html#emit-eventname-args)
* [Slim.emit](/zh/event.html#off-listener)

**Store** 实例API.
* [Store.dispatch](/zh/slimApi.html#store-dispatch)
* [Store.commit](/zh/slimApi.html#store-commit)
* [Store.getGetter](/zh/slimApi.html#store-getgetter)
* [Store.state](/zh/state.html)

## Reference

### Slim.createStore
`Slim.createStore(Spec)` 创建并返回一个**Store**实例。

```javascript
const store = Slim.createStore(spec)
```

### Spec
`Spec` 是`Slim.createStore`传入的一个配置对象

```javascript
const store = Slim.createStore(spec)
```


### Slim.use
`Slim.use(plugin)` 是一种在**Store**创建前的更灵活的插件注入方式

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
`Store.dispatch(actionType, ...args)` 触发 **Action**. [更多关于Action](/zh/action.html).

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
`Store.commit(reducerKey, ...args)` 触发 **Reducer**. [更多关于Reducer](/zh/reducer.html).

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
`Store.getGetter(getterKey)` 是state的组合方法。[更多关于getGetter](/zh/state.html#get-state).

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
`Spec.state` 是一个单对象数据源

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
`Spec.actions` 是方法的键值对。回调接收多个参数，第一个参数为当前**Store**上下文

```javascript
const actions = {
  actionType: (context, ...args) => {
    store.commit('actionType', ...args)
  }
}
```

### Spec.reducers
`Spec.reducers` 是方法的键值对。回调接收多个参数，第一个参数为当前**Store**下注册的**State**

```javascript
const reducers = {
  reducerKey: (state, arg1, arg2) => {
    state.someKey = arg1 + arg2
  }
}
```

### Spec.getters
`Spec.getters` 是方法的键值对。回调接收一个参数，为**Store**下注册的**State**

```javascript
const getters = {
  fullName: ({firstName, lastName}) => firstName + ' ' + lastName
}
```

### Spec.mode
`Spec.mode` 是数据限制模式，可选值：`"strict"(默认)`和`"loose"`，[更多关于Mode](/zh/controlLevel.html)

### Spec.plugin
`Spec.plugin` 是一个注入插件集合，类型为数组，[更多关于Plugin](/zh/plugin.html).
