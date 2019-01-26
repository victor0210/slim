# Reducer
**Reducers** specifies how **Store** receives the new **State**, which not only explains the corresponding type of operation, but also how the **State** changes.

## Design reducer
In **Slim**, a **Reducer** exists as a key-value pair, and we want to use a shorter code to fully explain what we need to do, for example: **[ACTION_TYPE : REDUCER_FUNCTION]**.

Let's see how to implement a **Reducer**. In our simple counter application, we want to have two things:

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

store.dispatch('increment')
```

In **Reducers**, the definition of **ACTION_TYPE** is very simple, no need for extra operations, we use the key name to indicate the type of operation, and directly start the corresponding operation in **dispatch**.

## Update state

How to update **State** in **Reducer**? We offer two possible ways.

### Return a new state object

This approach makes it easier for us to locate the overall change of **State**, and also makes the entire **Reducer** testable, but under the complex **State** structure will make the whole method bigger, the operation becomes It’s complicated.

```javascript
increment: (state) => {
    return {
        ...state,
        count: state.count + 1
    }
}
```

### Change directly on the state object

This method will be simple and convenient in most cases, but the corresponding **Reducer** will be untestable.

```javascript
increment: (state) => {
    state.count++
}
```

Of course, if you want to be convenient and want the method to be measurable, try the following method.

```javascript
increment: (state) => {
    state.count++

    return state
}
```

Each of the above methods has its own advantages and disadvantages. You can choose different treatment methods according to the specific conditions in the application.

## Pass arguments

When using **Reducer**, there will be a need to pass the corresponding parameters, and the parameter transfer is very convenient in **Slim**

```javascript
increment: (state, count, times) => {
    return {
        ...state,
        count: count * times   // 20
    }
}

store.dispatch('increment', 10, 2)
```

The required parameters are registered directly in the **Reducer** function, and can be directly separated by commas in **dispatch**.
