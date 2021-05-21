<template>
  <a-row :gutter="16" class="test-container" type="flex" justify="space-around" align="bottom">
    <a-col :span="8" class="left-panel">
      <router-view/>
    </a-col>
    <a-col :span="4" class="middle-panel">
      <router-view/>
    </a-col>
    <a-col :span="8" class="right-panel">
      <Right />
    </a-col>
  </a-row>
</template>

<script>
import Right from "@/pages/test/testRouter/Right";

export default {
  name: "TestLayout",
  components: {Right},
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.test-container {
  background: #13C2C2;

  .left-panel {
    background: bisque;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  .middle-panel {
    background: #e7cf44;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  .right-panel {
    background: darkseagreen;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
