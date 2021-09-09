<template>
  <div class="g-container">
    <div class="container">
      <p class="a">CSS 3D</p>
      <p class="b">NEON</p>
      <p class="a">EFFECT</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeDText"
}
</script>
<style scoped lang="less">
@import (css) url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300&display=swap");

.g-container {
  background: #000;
  text-align: center;
  display: inline-block;
  margin: 0 20px;
  padding: 20px;
  .container {
    transform:rotateX(25deg) rotateY(-25deg);

    p {
      letter-spacing: 0.1em;
      margin: 0;

      font-size: 55px;
      font-family: "Rajdhani", sans-serif;
      font-weight: bold;
    }

    .a {
      color: #88e;
      text-shadow: 0 0 0.3em rgba(200, 200, 255, 0.3),
      0.04em 0.04em 0 #112, 0.045em 0.045em 0 #88e,
      0.09em 0.09em 0 #112, 0.095em 0.095em 0 #66c,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #44a;
      animation: pulsea 300ms ease infinite alternate;
    }

    .b {
      color: #f99;
      text-shadow: 0 0 0.3em rgba(255, 100, 200, 0.3),
      0.04em 0.04em 0 #112, 0.045em 0.045em 0 #f99,
      0.09em 0.09em 0 #112, 0.095em 0.095em 0 #b66,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #a44;
      animation: pulseb 300ms ease infinite alternate;
    }

  }

  @keyframes pulsea {
    0% {
      text-shadow: 0 0 0.3em rgba(200, 200, 255, 0.3), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #88e, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #66c,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #aaf;
    }
    50% {
      text-shadow: 0 0 0.3em rgba(200, 200, 255, 0.3), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #88e, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #aaf,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #44a;
    }
    75% {
      text-shadow: 0 0 0.3em rgba(200, 200, 255, 0.3), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #aaf, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #66c,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #44a;
    }
    100% {
      text-shadow: 0 0 0.3em rgba(200, 200, 255, 0.4), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #88e, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #66c,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #44a;
    }
  }

  @keyframes pulseb {
    0% {
      text-shadow: 0 0 0.3em rgba(255, 100, 200, 0.3), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #f99, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #b66,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #faa;
    }
    50% {
      text-shadow: 0 0 0.3em rgba(255, 100, 200, 0.3), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #f99, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #faa,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #a44;
    }
    75% {
      text-shadow: 0 0 0.3em rgba(255, 100, 200, 0.3), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #faa, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #b66,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #a44;
    }
    100% {
      text-shadow: 0 0 0.3em rgba(255, 100, 200, 0.3), 0.04em 0.04em 0 #112,
      0.045em 0.045em 0 #f99, 0.09em 0.09em 0 #112, 0.095em 0.095em 0 #b66,
      0.14em 0.14em 0 #112, 0.145em 0.145em 0 #a44;
    }
  }
}
</style>
