<template>
  <span
    :style="{ top: showPositionTop + 'px', left: showPositionLeft + 'px' }"
  >
    气泡
  </span>
</template>

<script>
export default {
  name: "PopOver",
  data() {
    return {
      showPositionTop: -10,
      showPositionLeft: -10,
    }
  },
  methods: {
    showPop({x, y}) {
      this.showPositionTop = y || 0; // 弹出框上边距
      this.showPosition = this.showPositionTop; // 定义个变量保留弹出框初始时上边距，后面鼠标滚动时将使用
      this.showPositionLeft = x - 185 || 0; // 弹出框左边距，根据位置适当加减
    }
  }
}
</script>

<style scoped>

</style>
