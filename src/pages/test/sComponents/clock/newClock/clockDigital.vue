<template>
  <div class="digital" :class="{[`digital_${num}`]: true}">
    <span class="c1"></span>
    <span class="c2"></span>
    <span class="c3"></span>
    <span class="l1"></span>
    <span class="l2"></span>
    <span class="r1"></span>
    <span class="r2"></span>
  </div>
</template>

<script>
export default {
  name: "ClockDigital",
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="less">

.digital {
  position: relative;
  width: 26px;
  height: 46px;
  margin-left: 10px;
  transform: skew(-6deg);
}
.digital span {
  position: absolute;
  border-radius: 50vh;
  box-sizing: border-box;
}
.digital .c1,
.digital .c2,
.digital .c3 {
  height: 0;
  width: 26px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}
.digital .c1 {
  top: 0;
  left: 0;
  border-top: 4px solid currentColor;
}
.digital .c2 {
  top: 50%;
  left: 0;
  margin-top: -2px;
}
.digital .c2:before,
.digital .c2:after {
  content: "";
  height: 0;
  width: 24px;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  box-sizing: border-box;
}
.digital .c2:before {
  position: absolute;
  top: 0;
  left: -3px;
  border-bottom: 2px solid currentColor;
}
.digital .c2:after {
  position: absolute;
  top: 2px;
  left: -3px;
  border-top: 2px solid currentColor;
}
.digital .c3 {
  bottom: 0;
  left: 0;
  border-bottom: 4px solid currentColor;
}
.digital .l1,
.digital .l2 {
  height: 21px;
  width: 0;
  left: 0;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-left: 4px solid currentColor;
}
.digital .l1 {
  top: 1px;
  border-top-width: 4px;
}
.digital .l2 {
  top: 24px;
  border-bottom-width: 4px;
}
.digital .r1,
.digital .r2 {
  height: 21px;
  width: 0;
  right: 0;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-right: 4px solid currentColor;
}
.digital .r1 {
  top: 1px;
  border-top-width: 4px;
}
.digital .r2 {
  top: 24px;
  border-bottom-width: 4px;
}

.digital_1 .c1,
.digital_1 .c2,
.digital_1 .c3,
.digital_1 .l1,
.digital_1 .l2,
.digital_2 .l1,
.digital_2 .r2,
.digital_3 .l1,
.digital_3 .l2,
.digital_4 .c1,
.digital_4 .c3,
.digital_4 .l2,
.digital_5 .l2,
.digital_5 .r1,
.digital_6 .r1,
.digital_7 .c2,
.digital_7 .c3,
.digital_7 .l1,
.digital_7 .l2,
.digital_9 .l2,
.digital_0 .c2 {
  animation: changeDigital 200ms 0ms 1 ease-in forwards;
}

@keyframes changeDigital {
  form {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>
