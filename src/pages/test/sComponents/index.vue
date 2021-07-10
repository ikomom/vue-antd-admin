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
  </div>
</template>

<script>
import SSelect from "@/pages/test/sComponents/select";

export default {
  name: "index",
  components: {SSelect},
  data() {
    return {visible: false}
  }
}
</script>

<style scoped>

</style>
