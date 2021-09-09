<template>
  <div>
    <a-button @click="visible = true">显示</a-button>
    <a-modal :visible="visible" @cancel="visible = false" :width="700">
      <div style="height:130px;overflow: auto">
        <a-space>
          <s-select style="width: 180px" portal show-search />
          <s-select style="width: 180px"  />
          <a-select
            style="width: 180px"
            :getPopupContainer="e => {return e.parentNode || document.body}"
          >
            <a-select-option value="0">是</a-select-option>
            <a-select-option value="1">否</a-select-option>
          </a-select>
        </a-space>
        <div style="text-align: center;background-color: #b3d4fc;height: 400px">占位</div>
      </div>
    </a-modal>
    <ruby>
      英雄
      <rt>えいゆう</rt>
      <rp>(えいゆう)</rp>
    </ruby>
    <css-doodle style="display: inline-block;width: 200px;height: 200px;">
      :doodle {
      @grid: 18 / 200px;
      background: #0a0c27;
      }
      --hue: calc(180 + 1.5 * @row * @col);
      background: hsl(var(--hue), 50%, 70%);
      margin: -.5px;
      transition: @r(.5s) ease;
      clip-path: polygon(@pick(
      '0 0, 100% 0, 100% 100%',
      '0 0, 100% 0, 0 100%',
      '0 0, 100% 100%, 0 100%',
      '100% 0, 100% 100%, 0 100%'
      ));
    </css-doodle>
    <css-doodle style="width: 100px;height: 100px;display: inline-block;">
      :doodle {
      @grid: 500x1/ 40vmin;
      perspective: 10vmin;
            @size: 2em;
      }

      @place-cell: center;
      @size: 40% 1px;

      will-change: transform, opacity;
      transform-style: preserve-3d;

      background: linear-gradient(to left,
      @multi(@p([2-4]), @p(#00b8a9, #f8f3d4, #f6416c, #ffde7d)),
      transparent @r(50%)
      );

      animation: move @r(1s, 2s, .1) linear infinite;
      animation-delay: -@r(.1s, 2s);

      --trans:
      translateX(50%)
      rotateX(@r(-180deg, 180deg))
      rotateY(@r(-180deg, 180deg))
      rotateZ(@r(-180deg, 180deg));

      transform-origin: 0 center;
      transform: var(--trans) scale(2);
      opacity: 0;

      @keyframes move {
      20% { opacity: 1; }
      100% { transform: var(--trans) scale(0); }
      }
    </css-doodle>
    <br/>
    <transform-test/>
    <div style="background: #2C3A43;display: inline-block">
      <webpack-icon/>
      <webpack-icon class="perspective"/>
    </div>
    <TreeDText/>
    <space-cube/>
    <br/><br/>
  </div>
</template>

<script>
import SSelect from "@/pages/test/sComponents/select";
import TransformTest from "@/pages/test/sComponents/transform";
import WebpackIcon from "@/pages/test/sComponents/transform/WebpackIcon";
import TreeDText from "@/pages/test/sComponents/transform/TreeDText";
import SpaceCube from "@/pages/test/sComponents/transform/SpaceCube";

export default {
  name: "index",
  components: {SpaceCube, TreeDText, WebpackIcon, TransformTest, SSelect},
  data() {
    return {visible: false}
  }
}
</script>

<style scoped>

</style>
