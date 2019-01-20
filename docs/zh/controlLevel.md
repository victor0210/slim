# 限制级别
限制级别主要是控制**State**可变区域，限制越强对应**State**的修改范围越集中，修改方式越少，通过[mode](/zh/slimApi.html#mode)参数控制

:::tip 提示
请不要在生产环境使用 "strict" ，因为他对IE不支持，并且需要转换数据形态，而Slim希望做的事情是帮助大家在开发环境更好的构建状态管理，并不是限制整个应用程序的运行，请在打包的时候注意`mode`的配置，可以参考如下配置
:::

```javascript
const store = createStore({
    mode: process.env.NODE_ENV === 'production' ? 'loose' : 'strict'
})
```

## Strict
**strict**是控制级别中最高的等级，通过`Proxy`来监听状态变化，不关事对象还是数组，只要在**Reducer**意外的地方对其进行了修改，程序都将会报错。

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
**standard**控制相对strict会送一些，通过`Object.defineProperty`来对状态进行监听，但是监听不到某些特定情况下的数据变化。

```javascript
const state = {
    arr: [1, 2, 3],
    obj: {
        name: 'victor'
    }
}

// case 1: 通过下表新增数组元素
state.arr[4] = 10

// case 2: 直接赋值增加对象key
obj.age = 10
```

## Loose
**loose**是限制级别中最低的一个，对状态没有监听，没有限制，也就省去了数据监听带来的性能开销。
