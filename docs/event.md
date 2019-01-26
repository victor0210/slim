# EventCenter

State management and event management are indispensable in the project. Slim not only provides a good state management mechanism, but also integrates an event management center. There is no need to introduce event management separately.

## Why do that
* Increase the functionality of the overall framework, not limited to state management, but more like global (state and event) management.
* Prepare for the state execution process to provide slices for external access to personalized code (for example, in the Slim business scenario, you want to do some special checks for each proxy change), but this feature also Stay tuned during the experimental phase.

## Usage

The event center provides three APIs `on`, `off` and `emit`. The usage is very simple. Let us introduce each one separately.

:::warning
You can listen to add multiple event callbacks after an event name. When you remove an event, pass the callback function entity.
:::

### on(eventName[, listener])
```javascript
const store = Slim.createStore(...)

const listener = (name, age) => { 
  console.log(`hello ${name}, I'm ${age}-years-old.`) 
}

store.on('eventName', listener)
```

### emit(eventName[, ...args])

```javascript
store.emit(listener, 'victor', 18)

// output: hello victor, I'm 18-years-old.
```

### off(listener)

```javascript
store.off(listener)
```
