import {TEST_USER_KEY} from "@/pages/test/employTest/user";

export default {
  namespaced: true,
  state: {
    user: undefined,
    loadLastData: true
  },
  getters: {
    user: state => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(TEST_USER_KEY)
          state.user = JSON.parse(user)
        } catch (e) {
          console.error(e)
        }
      }
      return state.user
    },
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem(TEST_USER_KEY, JSON.stringify(user))
    },
    clearUser(state) {
      state.user = null
      localStorage.removeItem(TEST_USER_KEY)
    },
    setLoadLastData(state, last) {
      state.loadLastData = last
    },
  }
}
