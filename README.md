<p align="center">
    <img src="./starter/logo.png" width="80px">
</p>

<p align="center">
<a href="https://www.npmjs.org/package/slim-store">
    <img src="https://img.shields.io/npm/v/slim-store.svg" alt="npm version">
</a>
<a href="https://unpkg.com/slim-store/dist/slim.min.js">
    <img src="https://img.shields.io/bundlephobia/min/slim-store.svg" alt="bundle size">
</a>
<a href="https://packagephobia.now.sh/result?p=slim-store">
    <img src="https://packagephobia.now.sh/badge?p=slim-store" alt="install size">
</a>
<a href="https://codecov.io/gh/victor0210/slim">
    <img src="https://codecov.io/gh/victor0210/slim/branch/master/graph/badge.svg" alt="codecov">
</a>
<a href="https://travis-ci.org/victor0210/slim">
    <img src="https://travis-ci.org/victor0210/slim.svg?branch=master" alt="build status">
</a>
<a href="https://cypress.io">
    <img src="https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square" alt="Cypress.io tests">
</a>
<a>
    <img src="https://img.shields.io/github/license/victor0210/slim.svg" alt="Licence">
</a>
</p>

<h1 align="center">Slim</h1>

<p align="center">Centralized State-Non-Editable State Management With Proxy.</p>

## Documentation

* [English](https://victor0210.github.io/slimdocs/)
* [中文文档](https://victor0210.github.io/slimdocs/zh/)

## QuickStart

* [VSlim: Vue State Management With Slim](https://victor0210.github.io/slimdocs/vslim.html)
* [RSlim: React State Management With Slim](https://victor0210.github.io/slimdocs/rslim.html)

## Pipeline

Blew picture just only explain how the state transfer.
<img src="./starter/flow.png" alt="pipeline">

## Installation

### Scripts Tag
Get the newest version

```html
<!-- slim -->
<script src="https://unpkg.com/slim-store@latest/slim.min.js"></script> 

<!-- vslim: slim in vue -->
<script src="https://unpkg.com/vslim@latest/vslim.min.js"></script> 

<!-- rslim: slim in react -->
<script src="https://unpkg.com/rslim@latest/rslim.min.js"></script> 
```

### NPM
```bash
# slim
npm install slim-store

# vslim
npm install vslim

# rslim
npm install rslim
```

## Examples

* Base
    * [counter](./tree/master/example/base)
* Vue
    * [counter](./tree/master/example/vue-counter)
    * [counter-maps](./tree/master/example/vue-maps)
    * [todomvc](./tree/master/example/vue-todomvc)
* React
    * [counter](./tree/master/example/react-counter)
    * [counter-computed](./tree/master/example/react-counter-computed)
    * [todomvc](./tree/master/example/react-todomvc)

```bash
# install dependencies
npm install

# run server
npm run demo
```
## Contributing

* [English](https://github.com/victor0210/slim/blob/master/CONTRIBUTING.md)
* [中文文档](https://github.com/victor0210/slim/blob/master/CONTRIBUTING-zh.md)

## Licence

[MIT](https://opensource.org/licenses/MIT)
