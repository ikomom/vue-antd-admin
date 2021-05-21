import Vue from 'vue'
import KFormDesign from './source/packages'
import KInput from "@/kForm/custom/KInput";


const list = [
  {
    type: "SInput", // 组件类型
    label: "输入组件", // 组件名称
    component: KInput, // 组件
    options: {
      defaultValue: undefined, // 可选值
      disabled: false, // 可选值
      width: "100%",
      placeholder: "请输入", // 可选值
    },
    model: "", // 可选值
    key: "",
    rules: [ // 可选值
      {
        required: false,
        message: "必填项"
      }
    ]
  }
]

// 使用函数配置
KFormDesign.setConfig({
  title: "自定义组件",
  list: list
})
Vue.use(KFormDesign)
