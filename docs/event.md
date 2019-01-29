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

```javascript
import Slim from 'slim-store'

// callback
const listener = (name, age) => { 
  console.log(`hello ${name}, I'm ${age}-years-old.`) 
}

// subscribe event "eventName" and register callback
Slim.on('eventName', listener)
```

### emit(eventName[, ...args])

```javascript
// publish event ''
Slim.emit('eventName', 'victor', 18)

// output: hello victor, I'm 18-years-old.
```

### off(listener)

```javascript
// unsubscribe callback
Slim.off('eventName', listener)
```

## Demo

Use event center in react with subscribe event in childComponent and publish event by parentComponent

```javascript
import Slim from 'slim-store'
import React from 'react'

// subscribe 'child-component-event' in childA
class ChildComponentA extends React.Component {
  constructor (props) {
    super(props)
    
    Slim.on('child-component-A-event', (arg1, arg2) => {
      console.log('emit event in child component A')
      console.log(arg1, arg2)
    })
  }
}

// subscribe 'child-component-event' in childB
class ChildComponentB extends React.Component {
  constructor (props) {
    super(props)
    
    Slim.on('child-component-B-event', (arg1, arg2) => {
      console.log('emit event in child component B')
      console.log(arg1, arg2)
    })
  }
}

// emit 'child-component-event' in parent
class ParentComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div onClick={Slim.emit('child-component-event', 'from', 'parent')}>
        <ChildComponentA/>
        <ChildComponentB/>
      </div>
    )
  }
}
```
