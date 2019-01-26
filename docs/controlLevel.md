# Mode
The mode is mainly to control the **State** variable area. The stronger the restriction, the more concentrated the modification scope of the **State**, the less the modification method is, and the control is controlled by the [mode](/slimApi.html#mode) parameter.

:::tip
Please don't use "strict" in production environment, because he doesn't support IE and needs to convert data form. What Slim wants to do is to help you better manage state management in the development environment, not to limit the running of the entire application. Please pay attention to the configuration of `mode` when packing, you can refer to the following configuration
:::

```javascript
const store = Slim.createStore({
    mode: process.env.NODE_ENV === 'production' ? 'loose' : 'strict'
})
```

## Strict
**strict** is the highest level in the control level. It listens for state changes through `Proxy`. It doesn't matter whether it is an object or an array. As long as it is modified in the unexpected place of **Reducer**, the program will report an error.

## Loose
**loose** is the lowest of the limit levels. There is no limit to the state, no restrictions, which saves the performance overhead of data snooping.
