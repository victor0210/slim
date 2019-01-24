# 安装

## 标签引入
[https://unpkg.com/slim-store](https://unpkg.com/slim-store)
Unpkg.com 提供了基于 NPM 的 CDN 链接。以上的链接会一直指向 NPM 上发布的最新版本。您也可以通过 https://unpkg.com/slim-store@1.0.0 这样的方式指定特定的版本。

```html
<script src="https://unpkg.com/slim-store@1.0.0/slim.min.js"></script>
```

## NPM

```bash
npm install slim
```

## Yarn

```bash
yarn add slim
```

## 代码中引入

```javascript
import Slim from 'slim-store'
const state = {...}
const reducers = {...}
const store = Slim.createStore({
    reducers,
    state
})
```

## 构建源代码
如果需要构建使用用自己特定情况的代码，可以将仓库克隆下来自己构建，构建生成的目标代码将会存放在 `/dist` 目录下

```bash
git clone https://github.com/victor0210/slim.git
cd slim
npm install
npm run build
```
