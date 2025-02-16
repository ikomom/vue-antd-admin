<template>
  <transition
    v-if="!disabled"
    :enter-active-class="`animated ${enterAnimate} page-toggle-enter-active`"
    :leave-active-class="`animated ${leaveAnimate} page-toggle-leave-active`"
  >
    <slot></slot>
  </transition>
  <div v-else><slot></slot></div>
</template>

<script>
import {preset as animates} from '@/config/default/animate.config'

// 页面间动画转场
export default {
  name: 'PageTransition',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // 转场动画
    animate: {
      type: String,
      validator(value) {
        return animates.findIndex(item => item.name === value) !== -1
      },
      default: 'slide'
    },
    // 转场方向
    direction: {
      type: String,
      default: 'left',
      validator(value) {
        return ['x', 'y', 'left', 'right', 'up', 'down', 'downLeft', 'upRight', 'downRight', 'upLeft', 'downBig',
          'upBig', 'downLeft', 'downRight', 'topRight', 'bottomLeft', 'topLeft', 'bottomRight', 'default'].indexOf(value) > -1
      }
    },
    // 反向
    reverse: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    enterAnimate() {
      return this.activeClass(false)
    },
    leaveAnimate() {
      return this.activeClass(true)
    }
  },
  methods: {
    activeClass(isLeave) {
      const animate = animates.find(item => this.animate === item.name)
      if (animate === undefined) {
        return ''
      }
      let direction = ''
      if (this.direction === undefined) {
        direction = animate.directions[0]
      } else {
        direction = animate.directions.find(item => item === this.direction)
      }
      direction = (direction === undefined || direction === 'default') ? '' : direction
      if (direction !== '') {
        direction = isLeave && this.reverse ? this.reversePosition(direction, animate.directions) : direction
        direction = direction[0].toUpperCase() + direction.substring(1)
      }
      const t = isLeave ? 'Out' : 'In'
      return animate.name + t + direction
    },
    reversePosition(direction, directions) {
      if (direction.length === 0 || direction === 'x' || direction === 'y') {
        return direction
      }
      let index = directions.indexOf(direction)
      index = (index % 2 === 1) ? index - 1 : index + 1
      return directions[index]
    }
  }
}
</script>

<style lang="less">
.page-toggle-enter-active{
  //position: absolute !important;
  animation-duration: 0.8s !important;
  width: calc(100%) !important;
}
.page-toggle-leave-active{
  position: absolute !important;
  animation-duration: 0.8s !important;
  width: calc(100%) !important;
}
.page-toggle-enter{
}
.page-toggle-leave-to{
}
</style>
