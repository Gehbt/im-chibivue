export type ComponentOptions = {
  render?: (...args: any[]) => any;
  setup?: () => (...args: any[]) => any;
};
