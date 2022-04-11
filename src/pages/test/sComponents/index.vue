<template>
  <a-tabs>
    <a-tab-pane :key="1" tab="页面跳转">
      <single-setting/>
    </a-tab-pane>
    <a-tab-pane :key="2" tab="页面效果">
      <m-collapse title="ruby注音"><ruby>
        英雄
        <rt>えいゆう</rt>
        <rp>(えいゆう)</rp>
      </ruby></m-collapse>
      <m-collapse title="选择框">
        <a-button @click="visible = true">点击</a-button>
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
      </m-collapse>
      <css-doodle-test/>
      <m-collapse title="3d轮播图">
        <transform-test/>
      </m-collapse>
      <m-collapse title="webpack图标">
        <webpack-icon/>
        <webpack-icon class="perspective"/>
      </m-collapse>
      <m-collapse title="3d文字(text-shadow)">
        <TreeDText/>
      </m-collapse>
      <m-collapse title="模拟线条(未完成)">
        <space-cube/>
      </m-collapse>
      <m-collapse title="老虎机文字轮播" default-open="true"><input type="number" style="display: inline-block" v-model="rollNumber"/><number-roll :i="Number(rollNumber)"/></m-collapse>
      <m-collapse title="九宫格" ><Sudoku/></m-collapse>
      <m-collapse title="时钟" defaultOpen><Clock/></m-collapse>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import SSelect from "@/pages/test/sComponents/select";
import TransformTest from "@/pages/test/sComponents/transform";
import WebpackIcon from "@/pages/test/sComponents/transform/WebpackIcon";
import TreeDText from "@/pages/test/sComponents/transform/TreeDText";
import SpaceCube from "@/pages/test/sComponents/transform/SpaceCube";
import CssDoodleTest from "@/pages/test/sComponents/cssDoodle";
import MCollapse from "@/components/MCollapse";
import NumberRoll from "@/pages/test/sComponents/numberRoll";
import Sudoku from "@/pages/test/sComponents/Sudoku";
import SingleSetting from "@/pages/test/sComponents/SingleSetting";
import Clock from "@/pages/test/sComponents/clock";

export default {
  name: "index",
  components: {
    Clock,
    SingleSetting,
    Sudoku, NumberRoll, MCollapse, CssDoodleTest, SpaceCube, TreeDText, WebpackIcon, TransformTest, SSelect},
  data() {
    return {visible: false, rollNumber: 0}
  }
}
</script>

<style scoped>

</style>
