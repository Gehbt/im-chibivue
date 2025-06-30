import { defineComponent, h, reactive } from "vue";

const App = defineComponent({
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => {
      state.count++;
    };
    return function render() {
      return h("div", { id: "my-app" }, [
        h(
          "p",
          {
            style: {
              color: "red",
            },
          },
          [`count: ${state.count}`],
        ),
        h("button", { onClick: increment }, ["increment"]),
      ]);
    };
  },
});
export default App;
