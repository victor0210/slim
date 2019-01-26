---
home: true
heroImage: /logo.png
heroText: Slim
tagline: 基于Proxy的状态管理框架
actionText: 快速上手 →
actionLink: /zh/intro.html
features:
- title: 小巧精致
  details: 简单的API，微小的体积。
- title: 超强限制
  details: 状态更新完全被限制在reducer中，集中管理更新操作让状态变化更可预测。
- title: 独立运行
  details: 可以不依赖于任何框架单独运行。
footer: MIT Licensed | Copyright © 2019-present Victor
---

:::tip 提示
因为Slim不依赖于任何框架，所以它可以运用到任何框架，通过提供的[插件机制](/zh/plugin.html)集成到框架将变得非常的简单。
:::

## 安装

### CDN
```html
<script src="https://unpkg.com/slim-store@1.0.0/slim.min.js"></script>
```

### NPM
```bash
npm install slim-store
```

### Yarn
```bash
yarn add slim
```

## 代码引入

```javascript
import Slim from 'slim-store'

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
const store = Slim.createStore({
    reducers,
    state
})

// emit increment reducer
store.dispatch('increment')

console.log(store.state.count)
// output: 1
```

## 拓展设施

* [VSlim](/zh/vslim.html): 在Vue中基于Slim的状态管理框架
