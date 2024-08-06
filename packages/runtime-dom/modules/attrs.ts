/**
 * @desc 处理 attr, 直接将 attr 挂载到 el 上
 */
export function patchAttr(el: Element, key: string, value: any) {
  if (value === null || value === undefined) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, value);
  }
}
