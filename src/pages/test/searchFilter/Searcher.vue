<template>
  <a-space>
    Searcher
    <a-input v-model="query.input1" placeholder="input1"/>
    <a-input v-model="query.input2" placeholder="input2"/>
    <a-button @click="onSearch">search</a-button>
  </a-space>
</template>

<script>
export default {
    name: 'Searcher',
    data() {
      return {
        query: {}
      }
    },
    methods: {
      onSearch() {

      }
    }
}
</script>

<style>

</style>