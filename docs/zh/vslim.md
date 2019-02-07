# VSlim

**VSlim**是基于[Slim](/zh/intro.html)的[Vue](https://cn.vuejs.org/)状态管理拓展库，与其拥有同样的特性，并且还支持**State**的响应式哦

## 特点

* 小巧精致
* 增强数据劫持能力
* 使用便捷

相比**Vuex**，**VSlim**无需单独的实现**Action**，减少了项目的复杂度，使得状态更新更加简单直接。

除此之外，**VSlim**的**Store**是通过跟组件的**data**属性注入，通过**Vue**的数据劫持实现数据的双向绑定。
基于**Slim**开发，包含其核心功能并在此基础上弥补了一些**Vue**数据监听上的不足，例如对象设置新key和数组增加新下标值操作都得用`VueComponent.$set`去绑定新值实现劫持。
在**VSlim**里面无需担心新增数据导致的劫持遗漏。

**VSlim**提供了非常方便的注入方式`mapState`、`mapDispatchers`和`mapGetters`快速的在任意组件中注入**State**，**Dispatcher**和**Getter**

## 安装

### 标签引入

```html
<script src="https://unpkg.com/vslim/dist/vslim.min.js"></script>
```

### NPM

```bash
npm install vslim
```

## 快速开始

**App.js**

```javascript
import Vue from 'vue'
import App from './App.vue'
import VSlim from 'vslim'

Vue.use(VSlim);

let state = {
    count: 0
};

const reducers = {
    increment: (state) => {
        state.count++;
    },
    decrement: (state) => {
        state.count--
    }
}

const getters = {
    evenOrOdd: (state) => {
        return state.count % 2 === 0 ? 'Even' : 'Odd'
    }
}

let store = VSlim.createStore({
  reducers, state, getters
});

// 在Vue初始化的时候传入store
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

**App.vue**：通过helper方法快速注入到组件，或者通过`this.store`来获取到全局store对象

```vue
<template>
    <div id="app">
        <div class="btn" @click="decrement">-</div>
        <div id="count">Clicked: <span class="tag">{{ count }}</span> times, count is <span class="tag">{{ evenOrOdd }}</span>.</div>
        <!--或者通过 this.store.state.count 来访问count状态-->
        
        <div class="btn" @click="increment">+</div>
        <!--或者你可以这样触发 this.store.dispatch('increment') 来触发reducer-->
    </div>
</template>

<script>
    import {mapDispatchers, mapGetters, mapState} from 'vslim'

    export default {
        methods: {
          ...mapDispatchers([
            'increment',
            'decrement'
          ])
        },
        computed: {
          ...mapState([
            'count'
          ]),
          ...mapGetters([
            'evenOrOdd'
          ])
        },
        watch: {
            'count': {
                handler(val) {
                    console.log('new count: ' + val)
                }
            }
        }
    }
</script>

<style scoped></style>
```
## mapState

`mapState`是将**State**注入到组件的计算属性中，通过this.stateKey的方式直接读取，增强了使用的便捷性，使用方法很简单，只需要在方法中传入一个数组，
数组中包含需要注入的stateKey

```vue
<template>
    <div>{{count}}</div>
</template>

<script>
    import {mapState} from 'vslim'
    export default {
        computed: {
          ...mapState([
            'count'
          ])
        }
    }
</script>
```

## mapGetters

`mapGetters`是将**Getter**注入到组件的计算属性中，通过this.getterKey的方式直接读取，注册方式和`mapState`一样，传入数组
数组中包含需要注入的getterKey

:::warning 注意
VSlim推荐用注入的方式去使用getter
:::

```vue
<template>
    <div>{{evenOrOdd}}</div>
</template>

<script>
    import {mapGetters} from 'vslim'
    export default {
        computed: {
          ...mapGetters([
            'evenOrOdd'
          ])
        }
    }
</script>
```

## mapDispatchers
`mapGetters`是以`store.dispatch(actionKey)`的方式注入到组件的methods中，并转换为`this.actionKey()`去调用，无需再传入actionType，大大的简化了操作

```vue
<template>
    <div id="app">
        <div class="btn" @click="decrement">-</div>
        <div class="btn" @click="increment">+</div>
    </div>
</template>

<script>
    import {mapDispatchers} from 'vslim'

    export default {
        methods: {
          ...mapDispatchers([
            'increment',
            'decrement'
          ])
        }
    }
</script>
```

## VSlim更多示例
* [Counter](https://github.com/victor0210/slim/tree/master/example/vue-counter)
* [TodoMVC](https://github.com/victor0210/slim/tree/master/example/vue-todomvc)

## 插件接入
[Slim Plugin](/zh/plugin.html)
