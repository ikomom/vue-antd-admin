<template>
  <div class="cube-contain">
    <!-- top:320px;left: 749px;   -->
    <ul
      class="cube"
      style="
        --size: 50px;
        --li-color: #175D96;
        animation: fastspin 6s ease-in-out infinite 2s;
        margin: -25px 0 0 -25px;
        transform-origin: 25px 25px;
      "
    >
      <li class="top">top</li>
      <li class="bottom">bottom</li>
      <li class="front">front</li>
      <li class="back">back</li>
      <li class="right">right</li>
      <li class="left">left</li>
    </ul>
    <ul
      class="cube"
      style="
        --size: 100px;
        --li-color: #75AFCC;
        animation: slowspin 6s ease-in-out infinite 2s;
        margin: -50px 0 0 -50px;
        transform-origin: 50px 50px;
      "
    >
      <li class="top">top</li>
      <li class="bottom">bottom</li>
      <li class="front">front</li>
      <li class="back">back</li>
      <li class="right">right</li>
      <li class="left">left</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WebpackIcon"
}
</script>

<style scoped lang="less">
.cube-contain {
  height: 200px;
  width: 200px;
  display: inline-block;
  position: relative;

  .cube {
    --size: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    --li-color: rgba(141, 214, 249);
    padding: 0;
    //margin: 0;
    width: var(--size);
    height: var(--size);
    transform-style: preserve-3d;
    transform: rotateX(-33.5deg) rotateY(45deg);
    list-style-type: none;

    li {
      position: absolute;
      user-select: none;
      top: 0;
      left: 0;
      width: var(--size);
      height: var(--size);
      background: var(--li-color);
      border: 1px solid #fff;
      color: #fff;
      text-align: center;
      line-height: var(--size);
      font-size: 20px;
      opacity: 0.5;
    }

    .top {
      transform: rotateX(90deg) translateZ(calc(var(--size) / 2));
    }

    .bottom {
      transform: rotateX(-90deg) translateZ(calc(var(--size) / 2))
    }

    .back {
      transform: translateZ(calc(var(--size) / -2))
    }

    .front {
      transform: translateZ(calc(var(--size) / 2));
    }

    .right {
      transform: rotateY(270deg) translateZ(calc(var(--size) / 2))
    }

    .left {
      transform: rotateY(270deg) translateZ(calc(var(--size) / -2))
    }
  }
}

</style>
<style>
.perspective {
  transform-style: preserve-3d;
  perspective: 200px;
  transform: rotateX(10deg);
  /*perspective-origin: 100px 100px;*/
}

@keyframes fastspin {
  0% {
    transform: rotateX(-33.5deg) rotateY(45deg);
  }
  40%,
  to {
    transform: rotateX(-33.5deg) rotateY(-315deg);
  }
}

@keyframes slowspin {
  0% {
    transform: rotateX(-33.5deg) rotateY(45deg);
  }
  40%,
  to {
    transform: rotateX(-33.5deg) rotateY(315deg);
  }
}
</style>
