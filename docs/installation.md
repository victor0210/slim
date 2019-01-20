# Installation

## Scripts
[https://unpkg.com/slim](https://unpkg.com/slim)
Unpkg.com provides NPM-based CDN links. The above link will always point to the latest version published on NPM. You can also specify a specific version in the same way as https://unpkg.com/slim@1.0.0.

```html
<script src="/path/to/slim.js"></script>
```

## NPM

```bash
npm install slim
```

## Yarn

```bash
yarn add slim
```

## Use in application

```javascript
import {createStore} from 'slim'
const state = {...}
const reducers = {...}
const store = createStore({
    reducers,
    state
})
```

## Build with source
If you need to build code that uses your own specific situation, you can clone the repository and build it yourself. The generated target code will be stored in the `/dist` directory.

```bash
git clone https://github.com/victor0210/slim.git
cd slim
npm install
npm run build
```
