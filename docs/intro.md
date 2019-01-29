# Introduction

## What is Slim
**Slim** is a front-end framework for centralized simple state management.

### State Management
I believe that state management is no stranger to everyone, but here is a simple talk:

Whether it's an application under framework development (Vue, React) or a framework-free development, we need to better manage our various states so that the state does not become confusing and unpredictable, so that the entire application is difficult to maintain.

Therefore, the attention of state management is to extract the state that needs to be shared between components, follow a specific convention, and manage it uniformly so that the state changes can be predicted. According to this idea, a lot of patterns and libraries have been generated: Flux, Redux, Vuex, etc.

## Characteristics

* **Use Proxy for data hijacking to have a strong status update limit**
* **Friendly API**
* **Simple operation**
* **Smaller size**
* **Easy to integrate into various business scenarios or frameworks**
* **Built-in event center to exhaust global events**

### Simple To Use
Just register `State` and `Reducer` as below to use. [More](/zh/reducer.html)

```javascript
const state = {
  name: 'hello world1'
}

const reducers = {
  changeName: state => { state.name = 'hello everyone!' }
}

const store = Slim.createStore({state, reducers})

store.dispatch('changeName') 
```

### Strong Restriction
In the **Slim**, if the `strict` mode is enabled, the state modification limit will become abnormally strict, and any state changes other than the **Reducer** (the management area of ​​the state change in **Slim**) will be Will not be allowed.

### Small Size
The size of the entire **Slim** library is less than `5kb`

### Lightweight
Like the name, **Slim** is a lightweight state management tool that manages state with fewer operations and keeps changes in a more concentrated way, whether it's the rapid management of small projects or the complex management of large projects. This can be done using **Slim**.

### More flexible
**Slim** provides two constraint modes, `strict`, `loose`, which can be switched according to different needs.

### Easy Integrated
**Slim** provides a [Plugin](/zh/plugin.html) mechanism, which provides a very convenient operation for slim integration into existing popular frameworks.

## What has been solved?

Slim was created to solve common problems in the following three state management:

**1. The timing of the introduction of state management is not well determined**

When we need to maintain a small state, it is often handled by some simple global variables. However, in actual work situations, business development often does not follow your expectations, and the state becomes larger at any time. Possibly, when the state becomes huge and even difficult to maintain, the state management framework seems to have missed the best period, and refactoring a large number of states is not an easy task.
It is also the unpredictable business development. When the state becomes huge, it is also an unknown. It is not a very wise decision to introduce some state management frameworks at the beginning of the project. On the contrary, it will reduce the development efficiency and development experience.

**2. State management operations are cumbersome**

The large state management framework already provides an established state management model, often with some intermediate layers, which are not very straightforward to streamline, so it tends to make some very simple operations very complicated. While the simple state management framework provides simple operations, it does not guarantee state control in large application scenarios.

**3. State management is not strict enough**

Most state management libraries do not fully control data. The state changes in the following two specific operations are still uncontrollable, and they are just typical examples that are extremely prone to unpredictable state.

```javascript
state.arr[newIndex] = xxx
obj.newKey = xxx
```
Slim has very strong state control, ensuring ease of state operation and controllability of state changes, both for small and large applications. And because the state operation is simplified, the introduction of Slim at the beginning of the project will not have a negative impact.

## When to use

As long as you need state management, you can use Slim, Slim is a simple state management framework**, but under the protection of ** super strong state update restriction mechanism, adding any middle layer is very Easy and safe.

## Extensions

* [Use Slim with Vue](/zh/vslim.html)
* Use Slim with React（To be support）
