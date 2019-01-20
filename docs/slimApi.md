# API

## createStore
**Slim**目前只对外暴露了一个接口：`createStore`，传入一个参数`conf`对象

```javascript
const store = createStore({
    reducers,                   // default {}
    state,                      // default {}
    plugin,
    getters,                    // default {}
    mode                        // default 'strict'
})
```

### reducers
**reducers**就是一系列方法，接收两个及以上参数，**dispatch**时传入的参数将通过args接收，详情请查看[Reducer](/reducer.html)

```javascript
const reducers = {
    reducerKeyForDispatch: callback(state, draft, ...args) 
}
```

### state
**state**就是一个状态集中存放的单一对象，详情请查看[State](/state.html)

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
**plugin**就是一个简单的对象，提供了`before`和`after`执行周期hook来接入，接收三个参数`state`、`draft`和`action`，详情请查看[Plugin](/plugin.html)

```javascript
const slimPlugin = {
    before(state, draft, action) {},
    after(state, draft, action) {}
}
```

### getters
**getters**是**Slim**提供的一种更便捷构造state特定数据获取的方式，配合`store.getState('getterKey')`使用，每一个getter必须是一个函数，接收唯一参数`state`，
详情请查看[Getters](/state.html#getters)

```javascript
const getters = {
    username: ({user}) => user.name 
}
```

### mode
**mode**决定了**Slim**的限制级别，可选三个值 `strict`、`standard`和`loose`，默认：`strict`，三个值分别有什么区别

* **strict**：使用Proxy对数据进行监听，限制极强，不允许在reducer意外的任何地方修改任何数据
* **standard**：使用Object.defineProperty对数据进行简体，限制较强，不能限制在reducer以外以某些特定的方式修改数组或对象
* **loose**：无限制，建议在生产环境使用

## Store
**store**是通过**createStore**创建并返回的一个整体控制实例

```javascript
import {createStore} from 'slim'

const store = createStore(...)

// store: {
//     dispatch,                    触发reducer
//     subscribe,                   在注册之后新增reducer
//     unsubscribe,                 注销reducer
//     getState,                    获取最新state
//     applyPlugin                  在注册之后新增插件
// }
```

### dispatch
**dispatch**触发reducer执行，第一个参数为reducer对应的key，后续可以加入多个自定义的参数

```javascript
// sayHello应该这样接收自定义参数
const reducers = {
    sayHello: (state, draft, name, age, location) {...}
}

store.dispatch('sayHello', name, age, location)
```
### subscribe
类似于订阅事件，需要传入一个reducerKey和一个回调函数，回调函数接收参数和reducer注册一样

```javascript
store.subscribe('sayHello', (state, draft, name, age, location) => {...})

// 通用通过dispatch触发
store.dispatch('sayHello', name, age, location)
```

### unsubscribe
对应**subscribe**，**unsubscribe**将会取消reducer订阅，传入对应的reducerKey即可

```javascript
store.unsubscribe('sayHello')
```

### getState
获取最新的state，可填参数`getterKey`

```javascript
// 获取整个state
const state = store.getState()                  

// 获取getter对应的state值，需要提前注册getter，如果getter不存在则返回undefined
const username = store.getState('username')     
```

### applyPlugin
接入插件，接收一个plugin对象，每次只能添加一个plugin

```javascript
store.applyPlugin(slimPlugin)
```
