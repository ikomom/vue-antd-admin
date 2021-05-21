<template>
  <div>
    <input type="text" :value="value" @input="handleChange">
  </div>
</template>
<script>
export default {
  name: 'KInput',
  props: ['record', 'value'],
  // props: {
  //   record: {
  //     type: Object,
  //     require: true
  //   },
  //   value: {
  //     type: String,
  //     default: ''
  //   }
  // },
  methods: {
    handleChange (e) {
      console.log(e.target.value)
      // 使用 onChange 事件修改值
      this.$emit('change', e.target.value)
    }
  },
  mounted () {
    // 打印接收的options
    console.log(this.record)
  }
}
</script>
