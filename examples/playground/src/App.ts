import { h } from "chibivue";

const App = {
  render() {
    return h("div", {}, [
      h("p", {}, ["Hello world."]),
      h("button", {}, ["click me!"]),
    ]);
  },
};
export default App;
