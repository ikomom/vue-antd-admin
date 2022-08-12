<template>
  <Provider>
    <Searcher style="margin: 10px; 0px"/>
    <Content style="border: 1px solid red; padding: 10px;" />
  </Provider>
</template>

<script>
import Searcher from "./Searcher.vue";
import Content from "./Content.vue";
import { getProvider } from "./search";

export default {
  name: "SearchFilter",
  components: { Searcher, Content, Provider: getProvider() },
};
</script>

<style>
</style>