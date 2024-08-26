export type ComponentOptions = {
  // Function 可以匹配更窄的类型
  render?: Function;
  setup?: () => Function;
};
