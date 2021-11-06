<template>
  <div class="page">
    page3
    <a-button @click="goTo">第二页</a-button>
    <a-button @click="back">返回</a-button>
  </div>
</template>

<script>
import {sRouteMixin} from "@/pages/test/sComponents/SingleSetting/SingleRoute";

export default {
  name: "Page3",
  mixins: [sRouteMixin],
  methods: {
    back() {
      this.sRoute.back()
    },
    goTo() {
      this.sRoute.go('Page2')
    }
  }
}
</script>

<style scoped>

</style>
