---
home: true
heroImage: /logo.png
heroText: Slim
tagline: 基于Proxy的状态管理框架.
actionText: 快速上手 →
actionLink: /zh/intro.html
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
import {createStore} from 'slim'

// state is single object
const state = {
    count: 0
}

// reducers is event proxy
const reducers = {
    increment: (state) => {
        state.count += 1
    }
}

// create store
const store = createStore({
    reducers,
    state
})

// emit increment reducer
store.dispatch('increment')

console.log(store.getState().count)
// output: 1
```
