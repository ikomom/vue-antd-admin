<template>
  <component
    :is="as"
    class="roll-container"
    :class="{ 'border-animate': showAnimate }"
    @animationend="showAnimate = false"
  >
    <ul class="roll-list" :class="{ animate: showAnimate }" :style="{ '--i': i, '--delay': delay }">
      <li>0</li>
      <li v-for="item in 9" :key="item">{{ item }}</li>
      <li>0</li>
    </ul>
    <svg width="0" height="0">
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="`0 ${blur}`" />
      </filter>
    </svg>
  </component>
</template>

<script>
export default {
  name: "NumberRoll",
  props: {
    as: {// 外层包装的标签
      type: String,
      default: 'div'
    },
    blur: {// 模糊量
      type: Number,
      default: 2
    },
    i: {// 滚动的值
      type: Number,
      default: 0,
      validator: v => v < 10 && v >= 0 && Number.isInteger(v)
    },
    delay: {// 滚动时间
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      showAnimate: false
    }
  },
  watch: { i () { this.showAnimate = true } },
}
</script>

<style scoped lang="less">
.roll-container {
  position: relative;
  @height: 30px;
  height: @height;
  width: 20px;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid;

  .roll-list {
    transform: translateY(calc(var(--i) * -9.09%));
    //scroll-behavior: smooth;
    width: 100%;
    //animation: move 1s linear infinite; //alternate

    li {
      height: @height;
      text-align: center;
      line-height: @height;
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  .animate {
    animation: move .3s linear infinite,
    bounce-in-down 1s calc(var(--delay) * 1s) forwards
  }

  .border-animate {
    animation: enhance-bounce-in-down 1s calc(var(--delay) * 1s) forwards
  }

  @keyframes move {
    from {
      transform: translateY(-90%);
      filter: url(#blur)
    }
    to {
      transform: translateY(1%);
      filter: url(#blur)
    }
  }

  @keyframes bounce-in-down {
    from {
      transform: translateY(calc(var(--i) * -9.09% - 7%));
      filter: none
    }
    25% {
      transform: translateY(calc(var(--i) * -9.09% + 3%))
    }
    50% {
      transform: translateY(calc(var(--i) * -9.09% - 1%))
    }
    70% {
      transform: translateY(calc(var(--i) * -9.09% + .6%))
    }
    85% {
      transform: translateY(calc(var(--i) * -9.09% - .3%))
    }
    to {
      transform: translateY(calc(var(--i) * -9.09%))
    }
  }

  @keyframes enhance-bounce-in-down {
    25% {
      transform: translateY(8%)
    }
    50% {
      transform: translateY(-4%)
    }
    70% {
      transform: translateY(2%)
    }
    85% {
      transform: translateY(-1%)
    }
    to {
      transform: translateY(0)
    }
  }
}
</style>
