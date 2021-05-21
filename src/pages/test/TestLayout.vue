<template>
  <a-row :gutter="16" class="test-container" type="flex" justify="space-around" align="bottom">
    <a-col :span="8" push="1" class="left-panel">
      <p>左边</p>
    </a-col>
    <a-col :span="4" class="middle-panel" >
      <p>中间</p>
    </a-col>
    <a-col :span="8" class="right-panel">
      <p>右边</p>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "TestLayout",
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
  .test-container {
    background: #13C2C2;

    p {
      text-align: center;
      background: #5454ff;
      margin: 0;
      color: #ffffff;
    }

    .left-panel {
      background: bisque;
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      padding-top: 8px;
      p {
        height: 100px;
        line-height: 100px;
      }
    }

    .middle-panel {
      background: #e7cf44;
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      p {
        height: 60px;
        line-height: 50px;
      }
    }

    .right-panel {
      background: darkseagreen;
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      padding-bottom: 8px;
      p {
        height: 60px;
        line-height: 50px;
      }

    }
  }
</style>
