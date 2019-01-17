# Slim

[![npm version](https://img.shields.io/npm/v/hajax.svg)](https://www.npmjs.org/package/slim)
[![Github file size](https://img.shields.io/github/size/Bennnis/HAjax/release/dist/xxx.js.svg)](https://github.com/Bennnis/HAjax/blob/master/release/dist/hx.min.js)
[![install size](https://packagephobia.now.sh/badge?p=hajax)](https://packagephobia.now.sh/result?p=slim)
[![build status](https://travis-ci.org/Bennnis/HAjax.svg?branch=master)](https://travis-ci.org/bennnis/slim)
[![Open Source Helpers](https://www.codetriage.com/bennnis/hajax/badges/users.svg)](https://www.codetriage.com/bennnis/slim)

Centralized State Management With Proxy

<img src="./starter/flow.png">

## What is Slim
Slim is a Centralized State Manager with ES6 Proxy. Slim is simple to understand and simple to use. There are only three module you need to know.

* Reducer
* State
* Draft

### Reducer
Reducer is state controller look like a simple event proxy. You can register reducer esay with **ACTION\_TYPE** : **REDUCER\_FUNCTION**.

```
const reducers = {
	actionNameForDispatch: (draft, ...args) => {}
}
```

you should and you must update state inside it. Update directly or return a new State are both allowed and the choice is yours. Slim is very elastic, it given three modes to control way of updating state in reducer

**reduce: just allow return a new state**

```
(draft) => {
	...
	
	return {
		...draft,
		name: 'new name'
	}
}
```

**direct: just allow update directly**

```
(draft) => {
	draft.name = "new name"
	
	// return value would be no effect
}
```

**default: two ways both**

### State
State is a Single Source Reponsitory for all state in Frontend, Backend, Local and so on, which allows all kinds of data what you wanna to control. update state only allowed by **Reducer**

### Draft
Draft is a copy of **State**, which is exsit during process **Dispatching**(middleware, reducer, callback), you should update state by operating with it instead of real state. By the way, you can't update the real state.

## Examples

* [base counter]()
* [vue counter]()
* [vue todomvc]()

running demo by blow scripts

```
# install dependencies
npm install

# run server
npm run demo
```

## Licence

[MIT](https://opensource.org/licenses/MIT)
