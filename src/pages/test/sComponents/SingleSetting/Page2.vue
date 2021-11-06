<template>
  <div class="page">
    page2 {{sRoute.params}}
    <a-input  style="width: 100px"/><br/>
    <a-button @click="goTo">第二页</a-button>
    <a-button @click="back">返回</a-button>
  </div>
</template>

<script>
import {sRouteMixin} from "@/pages/test/sComponents/SingleSetting/SingleRoute";

export default {
  name: "Page2",
  mixins: [sRouteMixin],
  methods: {
    back() {
      this.sRoute.back()
    },
    goTo() {
      this.sRoute.go('Page3')
    },
  }
}
</script>

<style scoped>

</style>
