<template>
  <div @click="onSelect" class="select-option-item" >
    {{ index }} - {{ source.label }}
  </div>
</template>

<script>
import {dispatchMixin} from "@/pages/test/sComponents/mixin";

export default {
  name: 'options',
  mixins: [dispatchMixin],
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    onSelect() {
      this.dispatch('SSelectPanel', 'onSelect', this.source)
    }
  }
}
</script>
<style lang="less" scoped>

.select-option-item {
  &:hover {
    background-color: #b3d4fc;
    cursor: pointer;
  }

  border: 1px solid #8c8c8c;
}

.selected {
  background-color: #b3d4fc;
}
</style>
