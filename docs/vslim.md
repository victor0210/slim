# VSlim

**VSlim** is a [Vue](https://cn.vuejs.org/) state management extension library based on [Slim](/zh/intro.html), which has the same features and supports **State**'s responsiveness

## Installation

### with script tag

```html
<script src="https://unpkg.com/vslim@1.0.0/vslim.min.js"></script>
```

### with npm

```bash
npm install vslim
```

## Usage

**App.js**

```javascript
import Vue from 'vue'
import App from './App.vue'

// Import vslim from node_modules
import VSlim from 'vslim'

// Register slim in vue
Vue.use(VSlim);

// Create state and reducer like slim
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

// Inject store with vue initialing
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

**App.vue**：Get the global store object with `this.store`

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

## More Examples
* [Counter](https://github.com/victor0210/slim/tree/master/example/counter)
* [TodoMVC](https://github.com/victor0210/slim/tree/master/example/todomvc)

## Plugin
[Slim Plugin](/plugin.html)
