# VSlim

**VSlim** is a [Vue](https://cn.vuejs.org/) state management extension library based on [Slim](/zh/intro.html), which has the same features and supports responsive **State**

## Features

* Small and exquisite
* Enhanced data hijacking capabilities
* Easy to use

Compared to **Vuex**, **VSlim** does not require a separate implementation of **Action**, which reduces the complexity of the project and makes the status update simpler and more straightforward.

In addition, ** VSlim**'s **Store** is injected through the **data** property of the component, and the data is hijacked by **Vue** data hierarching.
Based on **Slim** development, including its core functions and on this basis make up for some **Vue** data monitoring deficiencies, such as the object set new key and array to add new subscript value operations have to use `VueComponent. $set` to bind the new value to achieve hijacking.
There is no need to worry about hijacking caused by new data in ** VSlim**.

**VSlim** provides very convenient injection methods `mapState`, `mapDispatchers` and `mapGetters` to quickly inject **State**, **Dispatcher** and **Getter** into any component.

## Installation

### Scripts

```html
<script src="https://unpkg.com/vslim/dist/vslim.min.js"></script>
```

### NPM

```bash
npm install vslim
```

## Quick Start

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

// Pass store with the initialization of Vue
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

**App.vue**: Quickly inject to the component via the helper method, or get the global store object via `this.store`

```vue
<template>
    <div id="app">
        <div class="btn" @click="decrement">-</div>
        <div id="count">Clicked: <span class="tag">{{ count }}</span> times, count is <span class="tag">{{ evenOrOdd }}</span>.</div>
        <!--or get 'count' with this.store.state.count-->
        
        <div class="btn" @click="increment">+</div>
        <!--or emit reducer with this.store.dispatch('increment')-->
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

`mapState` is to inject **State** into the computational properties of the component, directly read by this.stateKey, which enhances the convenience of use. The method is very simple, just pass in an array in the method.
Array contains the stateKey to be injected.

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

`mapGetters` is to inject **Getter** into the computed property of the component, read directly by this.getterKey, and register the same way as `mapState`, passing in the array.
The array contains the getterKey that needs to be injected.

:::warning
VSlim recommends using the infusion method to get the getter.
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
`mapGetters` is injected into the components of the method in the way of `store.dispatch(actionKey)`, and converted to `this.actionKey()` to call, no need to pass the actionType, greatly simplifying the operation.

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

## More Example
* [Counter](https://github.com/victor0210/slim/tree/master/example/vue-counter)
* [TodoMVC](https://github.com/victor0210/slim/tree/master/example/vue-todomvc)

## Plugin of Slim
[Slim Plugin](/zh/plugin.html)
