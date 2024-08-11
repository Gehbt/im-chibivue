import { h, reactive } from "chibivue";

const App = {
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => {
      state.count++;
    };
    return function render() {
      return h("div", { id: "my-app" }, [
        h("p", {}, [`count: ${state.count}`]),
        h("button", { onClick: increment }, ["increment"]),
      ]);
    };
  },
};
export default App;
