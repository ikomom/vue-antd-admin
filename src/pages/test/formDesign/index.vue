<template>
  <div>
    <k-form-build
        ref="kfb"
        :dynamicData="dynamicData"
        :value="defaultData"
        title="表单生成"
    />
    <a-button @click="handleSubmit">提交</a-button>
    <k-form-design ref='kfd' title="表单设计" @close="handleClose" @save="handleSave" />
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      dynamicData: {
        select1: [
          {key: '1', label: '缺失', value: 'xxxx'},
          {key: '2', label: '最新资讯', value: 'aaa'},
        ]
      },
      defaultData: {
        "list": [
          {
            "type": "select",
            "label": "下拉选择器",
            "options": {
              "width": "100%",
              "multiple": false,
              "disabled": false,
              "clearable": false,
              "hidden": false,
              "placeholder": "请选择",
              "dynamicKey": "select1",
              "dynamic": true,
              "options": [
                {
                  "value": "1",
                  "label": "下拉框1"
                }
              ],
              "showSearch": false
            },
            "model": "select_1621654489007",
            "key": "select_1621654489007",
            "help": "",
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
  mounted() {
    this.importData()
  },
  methods: {
    importData() {
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
    },
    handleSubmit() {
      this.$refs.kfb.getData().then(res => {
        console.log('res', res)
        this.$message.success('提交成功')
      }).catch(err => {
        console.error(err)
        this.$message.error('提交失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
