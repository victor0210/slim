# Slim

[![npm version](https://img.shields.io/npm/v/hajax.svg)](https://www.npmjs.org/package/slim)
[![Github file size](https://img.shields.io/github/size/Bennnis/HAjax/release/dist/xxx.js.svg)](https://github.com/Bennnis/HAjax/blob/master/release/dist/hx.min.js)
[![install size](https://packagephobia.now.sh/badge?p=hajax)](https://packagephobia.now.sh/result?p=slim)
[![build status](https://travis-ci.org/Bennnis/HAjax.svg?branch=master)](https://travis-ci.org/bennnis/slim)
[![Open Source Helpers](https://www.codetriage.com/bennnis/hajax/badges/users.svg)](https://www.codetriage.com/bennnis/slim)

Centralized State Management With Proxy, State-Non-Editable.

<img src="./starter/flow.png">

## What is Slim
Slim is a Centralized State Manager with ES6 Proxy, which is **state-non-editable** and simple to use. There are only three module you need to know.

* Reducer
* State

### Reducer
Reducer is state controller look like a simple event proxy. You can register reducer esay with

**ACTION\_TYPE** : **REDUCER\_FUNCTION**.

```
const reducers = {
	actionNameForDispatch: (state, ...args) => {}
}
```

you should and you must update state inside it. Update directly or return a new State are both allowed and the choice is yours.

### State
State is a Single Source Reponsitory for all state in Frontend, Backend, Local and so on, which allows all kinds of data what you wanna to control. update state only allowed by **Reducer**

## Why Slim

What is the difference between Slim and the more popular state management framework like Flux, Redux and Vuex?

### Smaller
All right! Just kidding. Next!

### State-Non-Editable

* Redux: state-editable
* Vuex: state-editable


You can't edit state anywhere out of reducer in Slim, which will make you more reassured that no one will modify the state in the business logic where you may not know. Where state change => Focus on reducer.

### Elastic
redux: update state by return a new state in reducer
vue: update state in mutation

Slim is very elastic, it given three modes to control way of updating state in reducer

**reduce: just allow return a new state**

```
(state) => {
	...

	return {
		...state,
		name: 'new name'
	}
}
```

**direct: just allow update directly**

```
(state) => {
	state.name = "new name"

	// return value would be no effect
}
```

**default: two ways both**

### Single Source
Slim provide a single-source state for the store, which only need paramter with a single-object. It's also can be registered in server side render

### Easy to be Integrated
There are two hooks in Slim, which make you can integrate easily.

* applyMiddleware
* applyCallback

here is other state managers integrated by Slim:

* [vslim: Vue State Management With Slim]()

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
