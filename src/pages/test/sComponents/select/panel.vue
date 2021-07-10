<template>
  <div v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SSelectPanel",
  props: ['onSelect'],
  mounted() {
    this.$on('onSelect', this.onSelect)
    // console.log('挂载' + this.$attrs.id, this)
  }
}
</script>

<style scoped>

</style>
