# 渲染HTML元素

添加 h函数 描述HTML元素, 创建 Virtual DOM

```js
export function h(type, props, children) {
  return { type, props, children };
}
```

为 RendererOptions 添加了四个方法
`createElement`
`createText`
`insert`
`patchProp`

这里的 patchProp 处理了传入的参数作为prop
还对 attr 和 event 有特殊的处理

patchProp 处理 event 还建立了 chibivue 的 sign map
