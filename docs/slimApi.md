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
