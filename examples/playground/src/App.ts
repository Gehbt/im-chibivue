import { h } from "chibivue";

const App = {
  render() {
    return h("div", {}, [
      h("p", {}, ["Hello world."]),
      h(
        "button",
        {
          onClick: () => {
            console.log("hellow");
          },
        },
        ["click me!"],
      ),
    ]);
  },
};
export default App;
