# EventCenter

项目中的状态管理和事件管理都是不可或缺的，Slim不仅提供了良好的状态管理机制，内部还整合了一套事件管理中心。不需要再去单独引入事件管理。

## 为什么这样做
* 增加整体框架的功能，不局限于状态管理，而更像是全局（状态和事件）管理。
* 为状态执行过程做好提供切片以供外部接入个性化代码的准备（例如在使用Slim的业务场景中希望拿到每次proxy变化的情况做一些特殊的校验等），但是这个功能还在实验阶段，敬请期待。

## 如何使用

事件中心提供了三个API `on`、`off`和`emit`，用法非常简单，我们为大家分别介绍一下

:::warning 注意
一个事件名后面可以监听添加多个事件回调，移除事件的时候请将回调函数实体传入
:::

### on(eventName[, listener])

```javascript
import Slim from 'slim-store'

// 回调函数
const listener = (name, age) => { 
  console.log(`hello ${name}, I'm ${age}-years-old.`) 
}

// 监听事件，事件名可以自定义，注册回调函数
Slim.on('eventName', listener)
```

### emit(eventName[, ...args])

```javascript
// 触发事件，并传入两个参数
Slim.emit('eventName', 'victor', 18)

// output: hello victor, I'm 18-years-old.
```

### off(eventName, listener)

```javascript
// 注销事件
Slim.off('eventName', listener)
```

## Demo

在react中父组件触发子组件中的事件

```javascript
import Slim from 'slim-store'
import React from 'react'

// 在子组件中订阅事件
class ChildComponentA extends React.Component {
  constructor (props) {
    super(props)
    
    Slim.on('child-component-A-event', (arg1, arg2) => {
      console.log('emit event in child component A')
      console.log(arg1, arg2)
    })
  }
}

class ChildComponentB extends React.Component {
  constructor (props) {
    super(props)
    
    Slim.on('child-component-B-event', (arg1, arg2) => {
      console.log('emit event in child component B')
      console.log(arg1, arg2)
    })
  }
}

// 在父组件中触发事件
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
