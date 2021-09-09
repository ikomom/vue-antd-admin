<template>
  <m-collapse title="css-Doodle">
    <m-collapse title="三角" style="margin-left: 10px">
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
    </m-collapse>
    <m-collapse title="时间穿梭" style="margin-left: 10px">
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
    </m-collapse>
  </m-collapse>
</template>

<script>
import MCollapse from "@/components/MCollapse";
export default {
  name: "CssDoodleTest",
  components: {MCollapse}
}
</script>

<style scoped>

</style>
