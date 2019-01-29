# Slim Devtools

**Slim** provides a status update logging tool with the main functions as follows

* More convenient viewing status changes and corresponding **Action**
* Quickly switch to a state at a certain moment
* Download the status value at a certain moment

## Installation & Usage

1. Start development mode (development environment is enabled by default)
2. Download [slim plugin] in the Chrome Store (https://chrome.google.com/webstore/detail/slimpanel/hpociphbnifckigemlmlohmnkglehfhj)
3. Open the console and switch to the slim tab page. In the development environment with **Slim**, **Devtool** will automatically record your status changes. 

:::tip
**Devtool** is integrated in **Slim**. If you need to use special processing in frameworks such as Vue or React, here is a demonstration example integrated in vue.
:::
<video width="100%" controls>
  <source src="/slimdocs/devtool.webm" type="video/webm">
  Your browser does not support the video tag.
</video> 

## Integration

In **Slim**, a built-in event `__SLIM_DEVTOOL_ANSWER__` will be exposed, triggered when you click `Revert`, and receive the `State` at the corresponding moment.

We recommend using plugins for integration, listening for `__SLIM_DEVTOOL_ANSWER__` in the `init hook` of [Plugin](/zh/plugin.html), then triggering **Reducer**:`__SLIM_DEVTOOL_SET__`update**State**
```javascript
import Slim from 'slim-store'

let devPlugin = {
    init(store) {
        Slim.on('__SLIM_DEVTOOL_ANSWER__', (state) => {
            store.dispatch('__SLIM_DEVTOOL_SET__', state)
        })
    }
}

Slim.use(devPlugin)
```

* [Integrated By VSlim](https://github.com/victor0210/slim/blob/master/src/vslim/index.js)
