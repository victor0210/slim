# API

### Slim.use
接入插件，接收一个plugin对象，每次只能添加一个plugin

```javascript
Slim.use(slimPlugin)
```

## Slim.createStore
**Slim**目前只对外暴露了一个接口：`createStore`，传入一个参数`conf`对象

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
**reducers**就是一系列方法，会接收一个默认参数**state**和其余自定义参数，**dispatch**时传入的参数将通过args接收，详情请查看[Reducer](/zh/reducer.html)

```javascript
const reducers = {
    reducerKeyForDispatch: callback(state, ...args) 
}
```

### state
**state**就是一个状态集中存放的单一对象，详情请查看[State](/zh/state.html)

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
**plugin**就是一个简单的对象，提供了`before`和`after`执行周期hook来接入，接收两个参数`state`和`action`，详情请查看[Plugin](/zh/plugin.html)

```javascript
const slimPlugin = {
    init(store) {},
    before(state, action) {},
    after(state, action) {}
}
```

### getters
**getters**是**Slim**提供的一种更便捷构造state特定数据获取的方式，配合`store.getState('getterKey')`使用，每一个getter必须是一个函数，接收唯一参数`state`，
详情请查看[Getters](/zh/state.html#getters)

```javascript
const getters = {
    username: ({user}) => user.name 
}
```

### mode
**mode**决定了**Slim**的限制级别，可选两个值 `strict`和`loose`，默认：`strict`，两个值分别有什么区别

* **strict**：使用Proxy对数据进行监听，限制极强，不允许在reducer意外的任何地方修改任何数据
* **loose**：无限制，建议在生产环境使用

## Store
**store**是通过**createStore**创建并返回的一个整体控制实例

```javascript
import Slim from 'slim-store'

const store = Slim.createStore(...)

// store: {
//     dispatch,                    触发reducer
//     getState,                    获取最新state
//     state                        state
//     on                           EventCenter.on
//     off                          EventCenter.off
//     emit                         EventCenter.emit
// }
```

### dispatch
**dispatch**触发reducer执行，第一个参数为reducer对应的key，后续可以加入多个自定义的参数

```javascript
// sayHello应该这样接收自定义参数
const reducers = {
    sayHello: (state, name, age, location) {...}
}

store.dispatch('sayHello', name, age, location)

// 链式调用
store.dispatch('one')
  .dispatch('two')
  .dispatch('three')
```

### getState
获取最新的state，可填参数`getterKey`

```javascript
// 获取整个state
const state = store.getState()                  

// 获取alias对应的state值，需要提前注册aliases，如果alias不存在则返回undefined
const username = store.getState('username')     
```

### on / off / emit
[EventCenter](/zh/event.html)
