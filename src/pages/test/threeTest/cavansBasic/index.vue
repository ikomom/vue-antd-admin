<template>
  <div>
    <a-space>
      <a-button @click="onClick" :type="draw ? 'primary' : 'default'">绘制</a-button>
      <input type="color" v-model="strokeColor">{{strokeColor}}
      <a-button @click="clear">重置</a-button>
    </a-space>
    <br/>
    <canvas width="640" height="480" ref="canvas" style="border:black 1px solid;" @click="onClickCanvas" @dblclick="onDbClickCanvas">
      Your browser does not support HTML5 Canvas. Please shift to another browser.
    </canvas>
  </div>
</template>

<script>

export default {
  name: "cavansBasic",
  data() {
    return {
      draw: false,
      strokeColor: '',
      drawIndex: 0,
    }
  },
  mounted() {
    window.ctx = this.context
  },
  computed: {
    context() {
      return this.$refs.canvas.getContext('2d')
    }
  },
  methods: {
    onClick(e) {
      console.log('onClick', e)
      this.draw = !this.draw;
      this.drawIndex = 0;
    },
    onDbClickCanvas(e) {
      console.log('onDbClick:canvas')
      if (this.draw) {
        this.draw = false
      }
    },
    onClickCanvas(e){
      console.log('onClick:canvas', e.offsetX, e.offsetY)
      if (this.draw) {
        if (this.drawIndex) {
          this.context.strokeStyle = this.strokeColor
          this.context.lineTo(e.offsetX, e.offsetY)
          this.context.stroke();
        } else {
          // 第一次画个起始点
          this.context.fillStyle = '#d53e3e'
          this.context.fillRect(e.offsetX, e.offsetY, 10, 10)
          // 不用每次
          this.context.moveTo(e.offsetX, e.offsetY)
        }
        this.drawIndex++;
      }
    },
    clear() {
      this.context.clearRect(0, 0, 640, 480)
      this.draw = false
    }
  },
  watch: {
    draw: {
      handler(val) {
        if (val) {
          this.$message.success('开始绘制')
          this.context.beginPath();
        } else {
          this.$message.error('结束绘制')
          // this.context.fill()
          this.context.closePath();
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
