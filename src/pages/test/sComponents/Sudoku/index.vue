<template>
  <div class="container">
    <!--  解法一: 只画一半边框 (box-sizing不设置样式会乱)  -->
    <ul class="sudoku border-top border-left" style="box-sizing: content-box;">
      <li v-for="item in 9" :key="item" class="border-right border-bottom">{{ item }}</li>
    </ul>
    <!--  解法二: 负边距  -->
    <ul class="sudoku">
      <li v-for="item in 9" :key="item" style="margin: -1px 0 0 -1px;">{{ item }}</li>
    </ul>
    <!-- 解法三：    outline: 1px solid #ccc;   -->
    <ul class="sudoku">
      <li  v-for="item in 9" :key="item" style="outline: 1px solid #ccc; "><a href="#">{{item}}</a></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Sudoku"
}
</script>

<style scoped lang="less">
.container {
  .border-right {
    border-right: 1px solid #000;
  }

  .border-left {
    border-left: 1px solid #000;
  }

  .border-top {
    border-top: 1px solid #000;
  }

  .border-bottom {
    border-bottom: 1px solid #000;
  }

  .sudoku {
    list-style-type: none;
    margin: 0 20px;
    padding: 0;
    width: 150px;
    text-align: center;
    display: inline-block;

    li:nth-child(3n+1) {
      /* 取消左负边距 */
      margin-left: 0
    }

    /* 前三个子元素 */

    li:nth-child(-n+3) {
      /* 取消上负边距 */
      margin-top: 0
    }

    li {
      line-height: 50px;
      width: 50px;
      height: 50px;
      display: inline-block;

      &:hover {
        color: red;
        border-color: currentColor;
        outline-color: red !important;
        cursor: pointer;
      }
    }
  }

  ul.box {
    display: inline-block;
    list-style: none;
    width: 165px;
    padding: 0;
    margin: 0 20px;
    text-align: center;

    li {
      float: left;
    }

    a {
      display: block;
      width: 50px;
      height: 50px;
      border: 1px solid blue;
      margin-left: -5px;
      margin-top: -5px;
      line-height: 50px;

      &:hover {
        position: relative;
        border-color: red;
        z-index: 100;
      }
    }

    &:after {
      content: "";
      height: 0;
      visibility: hidden;
      clear: both;
      display: block;
    }
  }
}

</style>
