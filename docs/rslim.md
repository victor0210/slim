# RSlim

**RSlim** is a [Vue](https://cn.vuejs.org/) state management extension library based on [Slim](/zh/intro.html), which has the same features and supports **State**'s responsiveness

:::warning
Please learn **Slim** related content before learning **RSlim** content to avoid the core concepts of the following content not understood because **RSlim** is based on the expansion of **Slim**!
:::

## Installation

### with script tag

```html
<script src="https://unpkg.com/rslim/dist/rslim.min.js"></script>
```

### NPM

```bash
npm install rslim
```

## Usage

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

**AppComponent.js**：Get the global store object with `RSlimConsumer`

```js
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

## More Examples
* [Counter](https://github.com/victor0210/slim/tree/master/example/react-counter)
* [Counter-Computed](https://github.com/victor0210/slim/tree/master/example/react-counter-computed)
* [TodoMVC](https://github.com/victor0210/slim/tree/master/example/react-todomvc)

## Plugin
[Slim Plugin](/plugin.html)
