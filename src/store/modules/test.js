import {TEST_APPLY_KEY, TEST_USER_KEY} from "@/pages/test/employTest/user";

// function createTable() {
//   const data = []
//   return {
//
//   }
// }

export default {
  namespaced: true,
  state: {
    user: undefined,
    loadLastData: true,
    autoSaveData: true,
    requireListStore: [], // 岗位列表(保存)
    applyListStore: [],// 申请列表（保存）
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
    requireListStore: state => state.requireListStore,
    applyListStore: state => {
      let user = state.applyListStore
      if (!state.user) {
        try {
          user = JSON.parse(localStorage.getItem(TEST_APPLY_KEY))
        } catch (e) {
          console.error(e)
        }
      }
      //.filter(item => item.createBy === state.user.name)
      return user
    }
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
    setAutoSaveData(state, auto) {
      state.autoSaveData = auto
    },
    setRequireListStore(state, list) {
      state.requireListStore = list || []
    },
    setApplyListStore(state, list) {
      state.applyListStore = list || []
      localStorage.setItem(TEST_APPLY_KEY, JSON.stringify(list))
    },
  }
}
