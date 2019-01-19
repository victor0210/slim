# Draft

## 简介
**Draft**是**State**在状态处理过程中的一个静态副本，它只存在于状态更新的过程中，不能在Middleware，Reducer和Callback以外的任何地方访问到它，既能提供更方便的状态更新操作，也能使每一步状态变化都是可回溯的。

::: warning 注意
使用**Draft**并不是一种对性能有益的做法，只是为了在在开发过程中提供更友好的操作又不失去状态管理的意义，因为每次都有一个copy的过程，在实际的生产过程中可以通过相关配置关闭**Draft**，关闭之后**Draft**将不会是**State**的静态副本，而是**State**本身，该功能正在实验中，尽可能的保证这样做不会影响整个状态变化的整体效果。
:::


## 操作Draft

```javascript
increment: (state, draft) => {
    draft.count++
}
```
