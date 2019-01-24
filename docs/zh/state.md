# State

**State**使用单一对象存储状态树——是的，用一个对象就包含了全部的应用层级状态。单一数据源更利于我们处理状态的每个阶段的快照，而且可以使其更方便地在同构应用中注入。

## 获取状态
获取状态只能通过以下方式，为什么是通过方法而不是直接访问属性？因为需要保证应用在访问**State**的时候**State**并没有处于被操作中，也是保证获取到的**State**一定是最新的

```
store.getState()
```

## Aliases
为了方便应用程序中更好的进行**State**的模块划分，使用**Alias**是一个不错的选择，可以想象一下当**State**层级很深的时候，获取**State**会是一件多么绝望的事情，在这个时候你或许需要在程序中定义一系列的getter方法来获取特定的**State**。不用担心，在这里**Slim**已经帮你做好了，你可以通过以下方式快速使用**Alias**

```javascript
const state = {
    user: {
        name: 'victor'
    }
}

const aliases = {
    username: state => state.user.name
}

const store = Slim.createStore({
    reducers,
    state,
    aliases
})

store.getState('username')  // victor
```
