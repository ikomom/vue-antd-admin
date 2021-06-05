import Vue  from "vue";
import store from "@/store";

export const checkPermission = (value) => {
  return store.getters["test/user"].role.find(role => role.permission.find(item => item === value))
}

export const checkRole = (value) => {
  return store.getters['test/user'].role.find(role => role.key === value)
}

Vue.directive('has',  {
  bind: function (el, binding) {
    // console.log('has', el, binding)
    el.title = binding.value
    if (!checkPermission(binding.value)) {
      el.style.display = 'none'
    }
  },
  inserted: function (el, binding) {
    // console.log('has', el, binding)
    el.title = binding.value
    if (!checkPermission(binding.value)) {
      // bind时parentId还未生成,放在inserted里去除
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  },
})

Vue.directive('has-role', {
  bind: function (el, binding) {
    el.title = binding.value
    if (!checkRole(binding.value)) {
      el.style.display = 'none'
    }
  },
  inserted: function (el, binding) {
    el.title = binding.value
    if (!checkRole(binding.value)) {
      // bind时parentId还未生成,放在inserted里去除
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})
