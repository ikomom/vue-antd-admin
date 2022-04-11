<template>
  <section style="display: inline-block">
    <div class="group" :class="{[`num-${num}`]: true}">
      <div class="hexagon hor top"></div>
      <div class="hexagon ver left up"></div>
      <div class="hexagon ver right up"></div>
      <div class="hexagon hor mid"></div>
      <div class="hexagon ver left low"></div>
      <div class="hexagon ver right low"></div>
      <div class="hexagon hor low"></div>
    </div>
    <div class="group dots">
      <div class="up"></div>
      <div class="down"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "clockNum",
  props: {
    num: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="less">
.group {
  position: relative;
  left: 100px;
  display: inline-block;

  .hexagon {
    @color: #FA4031;

    background: @color;
    position: relative;
    //transform: skew(-5deg);


    &:before,
    &:after {
      background: @color;
      content: "";
      position: absolute;
      width: 35px;
      height: 35px;
      transform: rotate(45deg);
    }

    &.hor {
      width: 100px;
      height: 50px;

      &:before {
        left: -18px;
        top: 8px;
      }
      &:after {
        right: -18px;
        top: 8px;
      }
    }
    &.ver {
      width: 50px;
      height: 150px;
      &:before {
        top: -18px;
        left: 8px;
      }
      &:after {
        bottom: -18px;
        left: 8px;
      }
    }
    &.left {
      margin-left: -52px;
      margin-top: 2px;
    }
    &.left.low {
      margin-left: -52px;
    }
    &.right {
      margin-left: 101px;
      margin-top: -150px;
    }
    &.right.low {
      margin-left: 101px;
    }
    &.hor.mid {
      margin-top: 1px;
    }

    &.hor.low {
      margin-top: 1px;
    }


  }
}

.dots {
  

  div {
    position: relative;
    background: #FA4031;
    height: 50px;
    width: 50px;
    margin-top: 48px;
    border-radius: 30px;
  }
}

.num-9 .ver.left.low,
.num-0 .hor.mid,
.group div {
  opacity: 0.2;
}
.num-0 div,
.num-9 div,
.num-8 div {
  opacity: 1;
}
.num-1 .ver.right.up,
.num-1 .ver.right.low {
  opacity: 1;
}

.num-3 .ver.right.low,
.num-2 .ver.right.up,
.num-3 .ver.right.up,
.num-7 .ver.right.up {
  opacity: 1;
}

.num-4 .ver.right.up,
.num-4 .ver.right.low {
  opacity: 1;
}

.num-5 .ver.right.low,
.num-7 .ver.right.low,
.num-6 .ver.right.low,
.num-2 .hor.top,
.num-7 .hor.top,
.num-3 .hor.top,
.num-6 .hor.top,
.num-5 .hor.top,
.num-2 .hor.mid,
.num-3 .hor.mid,
.num-4 .hor.mid,
.num-6 .hor.mid,
.num-5 .hor.mid,
.num-2 .ver.left.low,
.num-6 .ver.left.low,
.num-4 .ver.left.up,
.num-5 .ver.left.up,
.num-6 .ver.left.up,
.num-2 .hor.low,
.num-3 .hor.low,
.num-5 .hor.low,
.num-6 .hor.low,
.dots div {
  opacity: 1;
}


</style>
