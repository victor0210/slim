# Reducer

**Reducers**规定了**Store**更新**State**更新时机，它只说明**State**的变化过程。

:::warning 注意
请不要将业务逻辑放在Reducer中，这样会使Reducer变得庞大甚至不纯粹进而不可复用和不好维护。建议将异步操作和业务逻辑放入[Action](/zh/action.html)中。
:::

## 设计reducer
在**Slim**中，一个**Reducer**以一个键值对的方式定义，接下来让我们看看如何实现一个**Reducer**。在我们一个简单的计数器应用中，我们希望有两种操作：

* 增加计数：increment
* 减少计数：decrement

```javascript
import Slim from 'slim-store'

const state = {
    count: 0
}

const counters = {
    increment: (state) => {
        // increment count
    },
    decrement: (state) => {
        // decrement count
    }
}

const store = Slim.createStore({
    reducers: counters,
    state
})

store.commit('increment')
```

执行**Reducer**非常简单，执行`store.commit(reducerKey, ...arguments)`即可。

## 更新State

那在**Reducer**中如何更新**State**？我们提供了两种可行的方式

### 返回一个全新的State对象

这种纯函数的写法会让整个**Reducer**变得更可测试，无副作用（不会影响到函数外的参数变化）。但是在及其复杂的**State**结构下将会使整个操作和性能的成本变高。

```javascript
increment: (state) => {
    return {
        ...state,
        count: state.count + 1
    }
}
```

### 直接在State对象上更改

这种方法在大多数情况下会显得比较简洁和方便。

```javascript
increment: (state) => {
    state.count++
}
```

以上方法各有自己的优势和劣势，您可以根据应用中的具体情况选择不同的处理方式。

## 传入多参数

在使用**Reducer**的时候，不免会有传入对应参数的需求，在**Slim**中参数传递也非常的方便

```javascript
increment: (state, count, times) => {
    return {
        ...state,
        count: count * times   // 20
    }
}

store.commit('increment', 10, 2)
```
将需要的参数在**Reducer**函数入参中直接注册，在`store.commit`中直接使用逗号分隔传入即可
