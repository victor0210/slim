# VSlim

**VSlim**是基于[Slim](/zh/intro.html)的[Vue](https://cn.vuejs.org/)状态管理拓展库，与其拥有同样的特性，并且还支持**State**的响应式哦

## 安装

### 标签引入

```html
<script src="https://unpkg.com/vslim@1.0.0/vslim.min.js"></script>
```

### npm

```bash
npm install vslim
```

## 使用

**App.js**

```javascript
import Vue from 'vue'
import App from './App.vue'

// 引入vslim
import VSlim from 'vslim'

// 在Vue中注册VSlim
Vue.use(VSlim);

// 接下来像Slim一样构建状态即可
let state = {
    count: 0,
    arr: [],
    obj: {
        obj: {
            obj: 0
        }
    }
};

const reducers = {
    increment: (state) => {
        state.count++;
    },
    decrement: (state) => {
        state.count--
    }
}

let store = slim.createStore({
  reducers, state
});

// 在Vue初始化的时候传入store
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

**App.vue**：通过`this.store`来获取到全局store对象

```vue
<template>
    <div id="app">
        <div class="btn" @click="store.dispatch('decrement')">-</div>
        <div id="count">Clicked: <span class="tag">{{ store.state.count }}</span> times, count is <span class="tag">{{ evenOrOdd }}</span>.</div>
        <div class="btn" @click="store.dispatch('increment')">+</div>
    </div>
</template>

<script>
    export default {
        computed: {
            evenOrOdd() {
                return this.store.state.count % 2 === 0 ? 'Odd' : 'Even'
            }
        },
        watch: {
            'store.state.count': {
                handler(val) {
                    console.log('new count: ' + val)    // output when the count change
                }
            },
            'store.state.arr': {
                handler(val) {
                    console.log('new arr: ' + val)      // will not be triggered if value not modify 
                }
            },
            'store.state.obj': {
                handler(val) {
                    console.log('new obj: ' + val)      // will not be triggered if value not modify
                }
            }
        }
    }
</script>

<style scoped></style>
```

## VSlim更多示例
* [Counter](https://github.com/victor0210/slim/tree/master/example/counter)
* [TodoMVC](https://github.com/victor0210/slim/tree/master/example/todomvc)

## 插件接入
[Slim Plugin](/zh/plugin.html)
