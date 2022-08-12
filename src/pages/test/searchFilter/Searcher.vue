<template>
  <a-space>
    Searcher
    <a-input v-model="query.input1" placeholder="input1"/>
    <a-input v-model="query.input2" placeholder="input2"/>
    <a-button @click="onSearch" :loading="provider.loading">search</a-button>
  </a-space>
</template>

<script>
import {getInject} from "@/pages/test/searchFilter/search";

export default {
  name: 'Searcher',
  mixins: [getInject()],
  data() {
    return {
      query: {}
    }
  },
  methods: {
    onSearch() {
      this.provider.$action.excuse({...this.query})
    }
  },

}
</script>

<style>

</style>
