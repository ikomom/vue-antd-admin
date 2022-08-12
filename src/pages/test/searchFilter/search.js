import Vue from "vue";

export const PROVIDE_KEY = "Provider";

export const getProvider = (provideKey = PROVIDE_KEY) => {
  const store = Vue.observable({
    hello: "world",
  });

  
  return {
    provide() {
      return {
        [provideKey]: {
            store,
            excuse: () => {}
        },
      };
    },
    render(h) {
      return h("div", {}, this.$slots.default);
    },
  };
};
