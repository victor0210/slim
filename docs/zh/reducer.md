# Reducer

**Reducers**规范了**Store**如何接收全新**State**，它不仅阐述了对应的操作类型，也说明了**State**是如何发生的变化。

## 设计reducer
在**Slim**中，一个**Reducer**以一个键值对的方式存在，我们希望使用更简短的代码完整说明我们需要做的事情例如：**[ACTION_TYPE : REDUCER_FUNCTION]**

接下来让我们看看如何实现一个**Reducer**。在我们一个简单的计数器应用中，我们希望有两种操作：

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

store.dispatch('increment')
```

在**Reducers**中，**ACTION_TYPE**的定义非常简便，不需要额外的操作，我们通过键名来表明操作类型，并在**dispatch**中直接出发对应的操作即可。

## 更新State

那在**Reducer**中如何更新**State**？我们提供了两种可行的方式

### 返回一个全新的State对象

这种方式更易于我们定位**State**的整体变化，也让整个**Reducer**变得可测试，但是在复杂的**State**结构下将会使整个方法变大，操作变得复杂。

```javascript
increment: (state) => {
    return {
        ...state,
        count: state.count + 1
    }
}
```

### 直接在State对象上更改

这种方法在大多数情况下会显得比较简洁和方便，只是对应的**Reducer**将不可测。

```javascript
increment: (state) => {
    state.count++
}
```

当然，如果又想方便又希望方法可测，不妨试试下面的方法

```javascript
increment: (state) => {
    state.count++

    return state
}
```

以上方法各有自己的优势和劣势，您可以根据应用中的具体情况选择不同的处理方式。

## 传入参数

在使用**Reducer**的时候，不免会有传入对应参数的需求，在**Slim**中参数传递也非常的方便

```javascript
increment: (state, count, times) => {
    return {
        ...state,
        count: count * times   // 20
    }
}

store.dispatch('increment', 10, 2)
```
将需要的参数在**Reducer**函数入参中直接注册，在**dispatch**中直接使用逗号分隔传入即可
