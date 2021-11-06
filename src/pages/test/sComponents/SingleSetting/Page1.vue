<template>
  <div class="page">
    page1
    <a-input v-model="mdl.value" style="width: 100px"/>
    <a-button @click="goTo">第二页</a-button>
  </div>
</template>

<script>
import {sRouteMixin} from "@/pages/test/sComponents/SingleSetting/SingleRoute";

export default {
  name: "Page1",
  mixins: [sRouteMixin],
  data() {
    return {
      mdl: {
        value: ''
      }
    }
  },
  methods: {
    goTo() {
      this.sRoute.go('Page2', this.mdl)
    }
  }
}
</script>

<style scoped>
.page {
  background: #fff;
}
</style>
