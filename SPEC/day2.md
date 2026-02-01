# 渲染HTML元素

1. 添加 h函数, 通过 h 函数 描述HTML元素, 创建 Virtual DOM

```js
export function h(type, props, children) {
  return { type, props, children };
}
```

2. 为 RendererOptions 添加了四个方法
   `createElement`
   `createText`
   `insert`
   `patchProp`

这里的 patchProp 处理了 prop, 分为 attr 和 event 有分别的处理

attr 用了 dom api 的 setAttribute
event 转发了 event, 并且包装了 到了 \_vei对象(vue event invoker)上
