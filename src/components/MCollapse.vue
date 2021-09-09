<template>
  <details ref="details" :open="defaultOpen">
    <summary style="cursor: pointer">{{ title }}</summary>
    <slot />
  </details>
</template>

<script>
export default {
  name: "MCollapse",
  props: ['title', 'defaultOpen'],
  methods: {
    open() {
      this.$refs.details.open = true
    }
  },
}
</script>

<style scoped>

</style>
