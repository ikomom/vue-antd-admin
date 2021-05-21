<template>
  <div>
    <k-form-design ref='kfd'/>
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
            "type": "treeSelect",
            "label": "树选择器",
            "options": {
              "disabled": false,
              "multiple": false,
              "hidden": false,
              "clearable": false,
              "showSearch": false,
              "treeCheckable": false,
              "placeholder": "请选择",
              "dynamicKey": "",
              "dynamic": true,
              "options": [
                {
                  "value": "1",
                  "label": "选项1",
                  "children": [
                    {
                      "value": "11",
                      "label": "选项11"
                    }
                  ]
                },
                {
                  "value": "2",
                  "label": "选项2",
                  "children": [
                    {
                      "value": "22",
                      "label": "选项22"
                    }
                  ]
                }
              ]
            },
            "model": "treeSelect_1621589134432",
            "key": "treeSelect_1621589134432",
            "help": "",
            "rules": [
              {
                "required": false,
                "message": "必填项"
              }
            ]
          },
          {
            "type": "date",
            "label": "日期选择框",
            "options": {
              "width": "100%",
              "defaultValue": "",
              "rangeDefaultValue": [],
              "range": false,
              "showTime": false,
              "disabled": false,
              "hidden": false,
              "clearable": false,
              "placeholder": "请选择",
              "rangePlaceholder": [
                "开始时间",
                "结束时间"
              ],
              "format": "YYYY-MM-DD"
            },
            "model": "date_1621589168751",
            "key": "date_1621589168751",
            "help": "",
            "rules": [
              {
                "required": false,
                "message": "必填项"
              }
            ]
          },
          {
            "type": "time",
            "label": "时间选择框",
            "options": {
              "width": "100%",
              "defaultValue": "",
              "disabled": false,
              "hidden": false,
              "clearable": false,
              "placeholder": "请选择",
              "format": "HH:mm:ss"
            },
            "model": "time_1621589264984",
            "key": "time_1621589264984",
            "help": "",
            "rules": [
              {
                "required": false,
                "message": "必填项"
              }
            ]
          },
          {
            "type": "date",
            "label": "日期选择框",
            "options": {
              "width": "100%",
              "defaultValue": "",
              "rangeDefaultValue": [],
              "range": false,
              "showTime": false,
              "disabled": false,
              "hidden": false,
              "clearable": false,
              "placeholder": "请选择",
              "rangePlaceholder": [
                "开始时间",
                "结束时间"
              ],
              "format": "YYYY-MM-DD"
            },
            "model": "date_1621589266140",
            "key": "date_1621589266140",
            "help": "",
            "rules": [
              {
                "required": false,
                "message": "必填项"
              }
            ]
          },
          {
            "type": "date",
            "label": "日期选择框",
            "options": {
              "width": "100%",
              "defaultValue": "",
              "rangeDefaultValue": [],
              "range": false,
              "showTime": false,
              "disabled": false,
              "hidden": false,
              "clearable": false,
              "placeholder": "请选择",
              "rangePlaceholder": [
                "开始时间",
                "结束时间"
              ],
              "format": "YYYY-MM-DD"
            },
            "model": "date_1621589267240",
            "key": "date_1621589267240",
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
  mounted () {
    this.importData()
  },
  methods: {
    importData () {
      this.$refs.kfd.handleSetData(this.defaultData)
    }
  }
}
</script>

<style scoped>

</style>
