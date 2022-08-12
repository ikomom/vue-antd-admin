import Vue from "vue";

let timeRef

const getMock = () => {
  return new Promise(resolve => {
    clearTimeout(timeRef)
    timeRef = setTimeout(() => {
      resolve({
        code: 0,
        data: [
          {id: 1, value: 1, title: '第一'},
          {id: 2, value: 2, title: '第二'},
        ],
        timestamp: new Date().getTime()
      })
    }, Math.random() * 2000)
  })
}

export const PROVIDE_KEY = "Provider";

export const getInject = (alias= 'provider') => {
  return {
    inject: {
      [`${alias}`]: PROVIDE_KEY
    },
  }
}

export const getProvider = (provideKey = PROVIDE_KEY) => {
  const store = Vue.observable({
    loading: false
  });

  store.$action = {
    excuse: (params) => {
      store.loading = true
      console.log('excuse', params)
      return getMock().then(res => {
        Vue.set(store, 'response', res)
        console.log('getMock',store)
      }).finally(() => {
        store.loading = false
      })
    }
  }

  return {
    provide() {
      return {
        [provideKey]: store,
      };
    },
    render(h) {
      return h("div", this.$slots.default);
    },
  };
};
