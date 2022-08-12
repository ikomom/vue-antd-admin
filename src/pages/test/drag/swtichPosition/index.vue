<template>
  <div class="switch-position">
    <div draggable></div>
    <div draggable></div>
  </div>
</template>

<script>
export default {
  name: "SwitchPosition"
}
</script>

<style scoped lang="less">
.switch-position {
  display: flex;
  gap: 10px;
  div {
    background: #13C2C2;
    flex: 1;
    height: 100px;
  }
}
</style>
