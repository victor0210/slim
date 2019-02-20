# RSlim

**RSlim**是基于[Slim](/zh/intro.html)的[React](https://reactjs.org//)状态管理拓展库，与其拥有同样的特性，并且还支持**State**的响应式和计算属性哦

:::warning 注意
因为**RSlim**是基于**Slim**的拓展，所以请在学习**RSlim**内容之前务必先学习**Slim**相关内容以免下列内容的核心概念不理解！
:::

## 安装

### 标签引入

```html
<script src="https://unpkg.com/rslim/dist/rslim.min.js"></script>
```

### NPM

```bash
npm install rslim
```

## 快速开始

**App.js**

```javascript
import ReactDOM from 'react-dom'
import AppComponent from './AppComponent'
import RSlim, {RSlimProvider} from 'rslim'

// register state
let state = {
    count: 0
};

// register reducers
const reducers = {
    increment: (state) => {
        state.count++;
    },
    decrement: (state) => {
        state.count--
    }
}

// register getters
const getters = {
    evenOrOdd: (state) => {
        return state.count % 2 === 0 ? 'Even' : 'Odd'
    }
}

let store = RSlim.createStore({
  reducers, state, getters
});

ReactDOM.render(
  // inject store with "RSlimProvider"
  <RSlimProvider store={store}>
    <AppComponent/>
  </RSlimProvider>, document.getElementById('app')
)
```

**App.vue**：通过`RSlimConsumer`来获取到全局store对象

```javascript
import { Component } from 'react';
import './App.css';
import {RSlimConsumer} from 'rslim'

class AppComponent extends Component {
  render() {
    return (
      <RSlimConsumer>
        // $store is store instance
        // $state is store.state, for confidence
        // $cpt is "computed", which register with getters
        {({$store, $state, $cpt}) => (
          <div id="app">
            <div className="btn" onClick={() => {$store.commit('decrement')}}>-</div>
            <div id="count">
              Clicked:
              <span className="tag">{ $state.count }</span>
              times, count is
              <span className="tag">{ $cpt.evenOrOdd }</span>
              .
            </div>
            <div className="btn" onClick={() => {$store.commit('increment')}}>+</div>
          </div>
        )}
      </RSlimConsumer>
    );
  }
}

export default AppComponent;
```

## RSlim更多示例
* [Counter](https://github.com/victor0210/slim/tree/master/example/react-counter)
* [Counter-Computed](https://github.com/victor0210/slim/tree/master/example/react-counter-computed)
* [TodoMVC](https://github.com/victor0210/slim/tree/master/example/react-todomvc)

## 插件接入
[Slim Plugin](/zh/plugin.html)
