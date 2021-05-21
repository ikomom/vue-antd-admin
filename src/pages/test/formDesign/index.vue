<template>
  <div>
    <k-form-build ref="kfb"  :value="defaultData" title="表单生成"/>
    <k-form-design ref='kfd' title="表单设计"  @close="handleClose" @save="handleSave"/>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      defaultData: {
        "list": [
          {
            "type": "SInput",
            "label": "输入组件",
            "options": {
              "disabled": false,
              "width": "100%",
              "placeholder": "请输入"
            },
            "model": "SInput_1621591210614",
            "key": "SInput_1621591210614",
            "rules": [
              {
                "required": false,
                "message": "必填项"
              }
            ]
          }
        ],
        "config": {
          "layout": "horizontal",
          "labelCol": {
            "xs": 4,
            "sm": 4,
            "md": 4,
            "lg": 4,
            "xl": 4,
            "xxl": 4
          },
          "labelWidth": 100,
          "labelLayout": "flex",
          "wrapperCol": {
            "xs": 18,
            "sm": 18,
            "md": 18,
            "lg": 18,
            "xl": 18,
            "xxl": 18
          },
          "hideRequiredMark": false,
          "customStyle": ""
        }
      }
    }
  },
  mounted () {
    this.importData()
  },
  methods: {
    importData () {
      this.$refs.kfd.handleSetData(this.defaultData)
    },
    handleClose() {
      this.$message.error('关闭')
    },
    handleSave(data) {
      this.$confirm({
        title: '保存数据',
        content: <span>{data}</span>
      })
    }
  }
}
</script>

<style scoped>

</style>
