<template>
  <a-form-model-item :rules="record.rules">
    <a-input type="text" :value="value" @input="handleChange"  v-bind="record.options"/>
  </a-form-model-item>
</template>
<script>
export default {
  name: 'KInput',
  props: {
    record: {
      type: Object,
      require: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  created() {
    console.log('=====', {...this.$props})
  },
  methods: {
    handleChange(e) {
      console.log(e.target.value)
      // 使用 onChange 事件修改值
      this.$emit('change', e.target.value)
    }
  }
}
</script>
