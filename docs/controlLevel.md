# Mode
The mode is mainly to control the **State** variable area. The stronger the restriction, the more concentrated the modification scope of the **State**, the less the modification method is, and the control is controlled by the [mode](/slimApi.html#mode) parameter.

:::tip
Please don't use "strict" in production environment, because he doesn't support IE and needs to convert data form. What Slim wants to do is to help you better manage state management in the development environment, not to limit the running of the entire application. Please pay attention to the configuration of `mode` when packing, you can refer to the following configuration
:::

```javascript
const store = createStore({
    mode: process.env.NODE_ENV === 'production' ? 'loose' : 'strict'
})
```

## Strict
**strict** is the highest level in the control level. It listens for state changes through `Proxy`. It doesn't matter whether it is an object or an array. As long as it is modified in the unexpected place of **Reducer**, the program will report an error.

```javascript
const state = {
    arr: [{}, []]
}

const store = createStore({reducers, state})

const _state = store.getState()

console.log(_state.arr.indexOf(_state.arr[0]))    // output: -1
console.log(_state.arr.indexOf(_state.arr[1]))    // output: -1
```

## Standard
**standard** control will send some relative to the strict, through the `Object.defineProperty` to listen to the state, but can not monitor the data changes under certain circumstances.

```javascript
const state = {
    arr: [1, 2, 3],
    obj: {
        name: 'victor'
    }
}

// case 1: Add array elements through the table below
state.arr[4] = 10

// case 2: Direct assignment increases the object key
obj.age = 10
```

## Loose
**loose** is the lowest of the limit levels. There is no limit to the state, no restrictions, which saves the performance overhead of data snooping.
