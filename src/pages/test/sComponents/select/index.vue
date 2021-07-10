<template>
  <div class="select-wrap" ref="wrap">
    <div class="select-render" @click="onSelect" style="user-select: none">
      <a-input v-model="searchValue" :placeholder="placeValue" v-if="showSearch" style="width: 80%" />
      <span v-else :style="{lineHeight: renderHeight + 'px'}">{{ placeValue }}</span>
      <a-icon :type="visible ? 'up' : 'down'" style="pointer-events: none" />
    </div>
    <portal to="select-panel"  :disabled="!portal">
      <s-select-panel
        class="select-option-pane"
        v-show="visible"
        :style="panelStyle"
        :id="id"
        :on-select="onSelectItem"
      >
        <virtual-list
          :data-key="'key'"
          style="height: 180px; overflow-y: auto;"
          :data-sources="showSource"
          :data-component="itemComponent"
        >
        </virtual-list>
      </s-select-panel>
      <!--        <div v-show="!showSource.length">暂无数据</div>-->
    </portal>
  </div>
</template>

<script>

import VirtualList from 'vue-virtual-scroll-list'
import Options from './options'
import SSelectPanel from "@/pages/test/sComponents/select/panel";

export default {
  name: "sSelect",
  // eslint-disable-next-line vue/no-unused-components
  components: {SSelectPanel, VirtualList, Options},
  props: {
    portal: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      itemComponent: Options,
      id: new Date().getTime(),
      renderHeight: 30,
      visible: false,
      value: '',
      searchValue: '',
      panelX: 0,
      panelY: 0,
      panelWidth: 100,
      dataSource: Array.from({length: 100000}, (v, k) => ({
        label: k,
        value: k,
        key: k
      }))
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    // console.log('this.$refs.portal', this.$refs.portal.$on)
    // this.$refs.portal?.$on('onSelect', this.onSelectItem)
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    panelStyle({panelX, panelY, panelWidth, portal, renderHeight}) {
      if (portal) {
        return {
          top: panelY + 'px',
          left: panelX + 'px',
          width: panelWidth + 'px'
        }
      }
      return {
        top: renderHeight + 'px',
      }
    },
    showSource({searchValue, dataSource}) {
      return searchValue ? dataSource.filter(item => String(item.label).includes(searchValue)) : dataSource
    },
    placeValue({value, placeholder}) {
      return value || placeholder
    }
  },
  methods: {
    onResize(e) {
      // console.log('onResize', e)
      this.visible = false
    },
    onChange(e) {
      console.log('onChange', e.target.value)
    },
    onSelect(e) {
      console.log('onSelect', e, e.target.getBoundingClientRect(), this.$refs.wrap.getBoundingClientRect())
      const {x, y, width} = this.$refs.wrap.getBoundingClientRect()
      this.panelY = y + e.target.clientHeight
      this.panelX = x
      this.panelWidth = width
      this.visible = !this.visible
      this.searchValue = ''
    },
    onSelectItem(item) {
      console.log('onSelectItem', item)
      this.visible = false
      this.value = item.value
      this.searchValue = item.value
    }
  }
}
</script>

<style scoped lang="less">
.select-wrap {
  position: relative;
  display: inline-block;

  .select-render {
    border-radius: 8px;
    border: 1px solid #13C2C2;
    min-height: 30px;
    cursor: pointer;
    padding: 0 10px;

    input {
      border: none;

      &:focus {
        border-color: transparent;
        box-shadow: 0 0 transparent;
      }
    }

    i {
      line-height: 30px;
      float: right;
    }

    &::after {
      clear: both;
      content: '';
      display: block;
    }
  }

}


.select-option-pane {
  position: absolute;
  background-color: #ffffff;
  z-index: 999999;
  width: 100%;
  top: 0;
  left: 0;
  border: 1px solid #8c8c8c;
}
</style>
