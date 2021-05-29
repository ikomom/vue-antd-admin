<template>
  <div class="grid-container">
    <template v-for="item in 9">
      <grid-card :key="item" :title="`卡片${item}`" class="grid-item"/>
    </template>
  </div>
</template>

<script>
import GridCard from "@/pages/test/testGrid/modules/GridCard";
export default {
  name: "TestGrid",
  components: {GridCard}
}
</script>

<style scoped lang="less">
.grid-container {
  display: grid;
  grid-gap: 16px;
  //grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];

  .grid-item {

  }
}
</style>
