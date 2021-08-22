<template>
  <div
    class="container"
    :class="{ [hoverClass]: dragOver }"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDragDrop"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "dragContainer",
  props: {
    // todo 回退，不适用html5的draggable api, 而是监听鼠标事件
    fallback: {
      type: Boolean,
      default: false
    },
    hoverClass: {
      type: String,
      default: 'drag-hover'
    }
  },
  data() {
    return {
      // isDrag: false,
      dragOver: false,
      lastDragEnter: null
    }
  },
  methods: {
    onDragEnter(event) {
      // event.preventDefault()
      this.dragOver = true
      this.lastDragEnter = event.target
      // console.log('onDragEnter', this.lastDragEnter)
      this.$emit('dragenter', event)
    },
    onDragLeave(event) {
      // console.log('onDragLeave', event.target)
      if (event.target === this.lastDragEnter) {
        this.dragOver = false
      }
      this.$emit('dragleave', event)
    },
    onDragOver(event) {
      // 能触发drop方法
      event.preventDefault()
      // console.log('onDragOver', event)
      this.$emit('dragover', event)
    },
    onDragDrop(event) {
      // console.log('onDrop', event.dataTransfer)
      // 阻止浏览器默认行为
      event.preventDefault()
      this.lastDragEnter = null
      this.dragOver = false
      this.$emit('drop', event)
    },
  }
}
</script>

<style scoped lang="less">
.container {

}
</style>
