# 状态回溯工具

**Slim**提供了状态更新记录工具，主要功能如下

* 更方便的查看状态的的改变和对应的**Action**
* 快速的切换到某一时刻的状态
* 下载某一时刻的状态值

## 安装和使用

1. 开启开发模式（开发环境默认开启）
2. 在Chrome Store中下载[slim插件](https://chrome.google.com/webstore/detail/slimpanel/hpociphbnifckigemlmlohmnkglehfhj)
3. 打开控制台切换到slim tab页，在有**Slim**运行的开发环境下，**Devtool**将会自动记录您的状态变化。 

:::tip 提示
**Devtool**集成在**Slim**中，如需配合Vue或者React等框架中使用还需要进行特殊处理，下面是一个集成在vue中的展示例子
:::
<video width="100%" controls>
  <source src="/slimdocs/devtool.webm" type="video/webm">
  Your browser does not support the video tag.
</video> 

## 集成方式

在**Slim**中会暴露出一个内置事件`__SLIM_DEVTOOL_ANSWER__`，在点击`Revert`时触发，接收对应时刻的`State`

我们推荐使用插件的形式进行集成，在[Plugin](/zh/plugin.html)的`init hook`中监听`__SLIM_DEVTOOL_ANSWER__`，然后触发**Reducer**：`__SLIM_DEVTOOL_SET__`更新**State**
```javascript
import Slim from 'slim-store'

let devPlugin = {
    init(store) {
        store.on('__SLIM_DEVTOOL_ANSWER__', (state) => {
            store.dispatch('__SLIM_DEVTOOL_SET__', state)
        })
    }
}

Slim.use(devPlugin)
```

* [VSlim集成代码](https://github.com/victor0210/slim/blob/master/src/vslim/index.js)
