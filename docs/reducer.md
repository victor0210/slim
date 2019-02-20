# Reducer

**Reducers** specifies the **Store** update**State** update timing, which only describes the change process of **State**.

:::warning attention
Please don't put the business logic in the Reducer, which will make the Reducer huge or even not reusable and not well maintained. It is recommended to put asynchronous operations and business logic into [Action] (/zh/action.html).
:::

## Design reducer
In **Slim**, a **Reducer** is defined as a key-value pair. Let's see how to implement a **Reducer**. In our simple counter application, we want to have two things:
* increment the count：increment
* decrement the counet：decrement

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

Executing **Reducer** is very simple, just execute `store.commit(reducerKey, ...arguments)`.

## Update State

How to update **State** in **Reducer**? We offer two possible ways

### Return a brand new State object

This pure function notation makes the entire **Reducer** more testable, with no side effects (no effect on parameter changes outside the function). But in its complex **State** structure will make the overall operation and performance costs higher.

### Change directly on the State object

This method will appear simple and convenient in most cases.

```javascript
increment: (state) => {
    state.count++
}
```

Each of the above methods has its own advantages and disadvantages. You can choose different treatment methods according to the specific conditions in the application.

## Incoming multiple parameters

When using **Reducer**, there will be a need to pass the corresponding parameters, and the parameter transfer is very convenient in **Slim**

```javascript
increment: (state, count, times) => {
    return {
        ...state,
        Count: count * times // 20
    }
}

store.commit('increment', 10, 2)
```
The required parameters are registered directly in the **Reducer** function, and can be directly separated by commas in `store.commit`.
