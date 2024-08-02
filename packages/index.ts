export type Options = {
  render: () => string
}

export type App<T = any> = {
  mount: (selector: string) => void
  unmount: () => void
}

export const createApp = (options: Options): App => {
  return {
    mount: selector => {
      const root = document.querySelector(selector)
      if (root) {
        root.innerHTML = options.render()
      }
    },
    unmount: () => {
      // TODO
    }
  }
}