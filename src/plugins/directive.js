import Vue  from "vue";
import store from "@/store";

Vue.directive('has',  {
  bind: function (el, binding) {
    // console.log('has', el, binding, vnode)
    el.title = eval(binding.expression)
    const has = store.getters["test/user"].permission.find(item => item === el.title)
    if (!has) {
      el.style.display = 'none'
    }
  }
})
