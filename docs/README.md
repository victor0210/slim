---
home: true
heroImage: /logo.png
heroText: Slim
tagline: 基于Proxy的状态管理框架.
actionText: 快速上手 →
actionLink: /guide/
features:
- title: 状态只读
  details: 状态只能在Reducer里面被修改，省去了状态变化不可控的烦恼。
- title: 单一数据源
  details: 操作集中管理，状态集中存放，易于同构应用的状态初始化。
- title: 易于集成
  details: 状态Hook易于快速集成到各个主流框架之中，例如 Vue。
footer: MIT Licensed | Copyright © 2018-present Victor
---

## 快速使用

### 安装

```bash
npm install slim
```

### 代码引入

```javascript
// state is single object
const state = {
    count: 0
}

// reducers is event proxy
const reducers = {
    increment: (state, draft) => {
        draft.count += 1
    }
}

// create store
const store = createStore(reducers, state)

// emit increment reducer
store.dispatch('increment')

console.log(store.getState().count)
// output: 1
```

::: warning 注意
Slim推荐更集中的状态管理方式，增强了对修改的限制，但是与此同时也产生了一个 [问题]()
:::
