export const dispatchMixin = {
  methods: {
    dispatch(componentName, eventName, ...rest) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      // console.log('name', name)
      while (parent && (!name || name !== componentName)) {
        // console.log('name', parent?.$options.name)
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        // console.log('找到', parent.$options.name, parent)
        parent.$emit.apply(parent, [eventName].concat(rest))
      } else {
        console.warn(componentName, eventName, '未找到')
      }
    }
  }
}
