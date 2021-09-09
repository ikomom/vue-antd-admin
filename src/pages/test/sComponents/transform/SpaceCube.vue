<template>
  <div class="g-container">
   <div class="container">
     <div v-for="item in 200" :key="item" :style="getStyle(item)" ></div>
   </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "SpaceCube",
  methods: {
    getStyle() {
      return {
        transform: `
          rotateX(${Math.floor(_.random(-180, 180))}deg)
          rotateY(${Math.floor(_.random(-180, 180))}deg)
          rotateZ(${Math.floor(_.random(-180, 180))}deg)
        `,
        height: _.random(15, 30) + 'px',
        transformOrigin: '0 center'
      }
    }
  }
}
</script>

<style scoped lang="less">
.g-container {
  background-color: #000;
  width: 200px;
  height: 200px;

  .container {
    transform-style: preserve-3d;
    perspective: 10vmin;
    transform-origin: 0 center;
    display: inline-block;
    line-height: 0;

    div {
      width: 1px;
      margin: 1px;
      display: inline-block;
      background: #fff;
    }
  }


}
</style>
