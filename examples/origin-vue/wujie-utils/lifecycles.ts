import type { cacheOptions } from "wujie";
export const lifecycles = {
  beforeLoad: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url, e) => console.log(`${url} 加载失败`, e),
} satisfies Partial<cacheOptions>;

// function fib(n: number) {
//   return fibIter(1, 0, 0, 1, n);
// }
// function fibIter(a: number, b: number, p: number, q: number, count: number) {
//   if (count === 0) {
//     return b;
//   } else if (count % 2 === 0) {
//     return fibIter(a, b, p * b + q * q, 2 * p * q + q * q, count / 2);
//   } else {
//     return fibIter(b * q + a * q + a*p, b * q + a * q, p, q, count);
//   }
// }
